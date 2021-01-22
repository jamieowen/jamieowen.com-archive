import { SpriteAsset, SpriteJson, SpriteFrame } from "./SpriteAssetLoader";
import {
  PlaneBufferGeometry,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  Texture,
  BufferAttribute,
} from "three";
import { GridCell } from "@jamieowen/layout";

const sourceGeometry = (() => {
  const geom = new PlaneBufferGeometry(1, 1, 1, 1);
  geom.applyMatrix4(new Matrix4().makeTranslation(-0.5, -0.5, 0));
  return () => {
    return geom;
  };
})();
export const createGeometry = () => {
  const geom = sourceGeometry().clone();
  return geom;
};

export const updateUV = (geom: PlaneBufferGeometry) => {
  return geom;
};

interface ProjectFrames {
  frameRefs: {
    frame: SpriteFrame;
    texture: Texture;
    uv: Float32Array;
  }[];
}

const mod = (x: number, n: number) => {
  return ((x % n) + n) % n;
};

export class SpriteMeshFactory {
  map: Map<number, Mesh> = new Map();
  count: number = 0;
  visible: Set<Mesh> = new Set();
  projects: ProjectFrames[] = [];
  hasProjects: boolean = false;

  create(cell: GridCell) {
    let mesh: Mesh;
    if (this.count > 0) {
      mesh = this.map.get(this.count);
      this.count--;
    } else {
      // Retain individual geometry for each, for UVS.

      const geom = createGeometry();
      console.log("CREATE MESH......", geom.attributes["uv"].array);
      mesh = new Mesh(
        geom,
        new MeshBasicMaterial({
          color: 0xffffff,
        })
      );
    }
    this.visible.add(mesh);
    mesh.userData = cell;
    this.assignMesh(mesh, cell);
    return mesh;
  }

  release(mesh: Mesh) {
    this.count++;
    this.map.set(this.count, mesh);
    this.visible.delete(mesh);
  }

  assignMesh(mesh: Mesh, cell: GridCell) {
    if (this.projects && this.projects.length > 0) {
      try {
        const pos = cell.cell;
        const project = this.projects[mod(pos[1], this.projects.length)];
        if (project) {
          const frameOff = mod(pos[0], project.frameRefs.length);
          const frame = project.frameRefs[frameOff];
          const mat = mesh.material as MeshBasicMaterial;
          if (frame && frame.texture) {
            // console.log("ASSIGN MESH  :", frame.texture);
            mat.map = frame.texture;
            mat.needsUpdate = true;
            const uv = frame.uv;
            const geom = mesh.geometry as PlaneBufferGeometry;
            const uva = geom.attributes["uv"] as BufferAttribute;

            const arr = uva.array;
            // @ts-ignore
            uva.copyArray(uv);
            uva.needsUpdate = true;
            // arr[0] = uv[0];
            // uva.array[1] = uv[2];

            // const att = geom.
          } else {
            console.log("no frame", frameOff, project.frameRefs, cell.cell);
          }
        } else {
          console.log("no project");
        }

        // console.log("assign mesh", cell.cell, frame.texture);
      } catch (err) {
        console.error("EROR", err);
        throw err;
      }
    } else {
      console.log("Skip assignMesh");
    }
  }
  /**
   * Update the visible cells with the correct sprite / geometry
   */
  assignCells() {
    if (this.projects) {
      for (let mesh of this.visible.keys()) {
        this.assignMesh(mesh, mesh.userData as GridCell);
      }
    }
  }

  /**
   * Update the sprite assets which will in turn update the texture
   * assigned to each cell.
   *
   * @param assets
   */
  updateAssets(assets: SpriteAsset[]) {
    // Reduce to asset / json / texture - should really be created by SpriteAssetLoader
    const assetMap = assets.reduce<
      Record<string, { json: SpriteJson; png: Texture }>
    >((map, asset) => {
      const [url, ext, data] = asset;
      const name = url.split("/").slice(-1)[0].replace(`.${ext}`, "");
      if (!map[name]) {
        map[name] = {
          png: null,
          json: null,
        };
      }
      map[name][ext] = data;
      return map;
    }, {});

    // Create 2d array of project name to list of items.
    const projectsMap = Object.entries(assetMap).reduce<
      Record<string, ProjectFrames>
    >((projects, [name, item]) => {
      const { json, png } = item;

      json.frames.reduce((projects, frame) => {
        const pName = frame.filename.split("_")[0];
        if (!projects[pName]) {
          projects[pName] = {
            frameRefs: [],
          };
        }

        const fx = frame.frame.x;
        const fy = frame.frame.y;
        const fw = frame.sourceSize.w;
        const fh = frame.sourceSize.h;
        const tw = json.meta.size.w;
        const th = json.meta.size.h;

        // typical three.js geom order : 0, 1, 1, 1, 0, 0, 1, 0
        const uv = new Float32Array([
          fx / tw,
          (fy + fh) / th,
          (fx + fw) / tw, // 1,1
          (fy + fh) / th,
          fx / tw, // 0,0
          fy / th,
          (fx + fw) / tw,
          fy / th,
        ]);

        // const uv = new Float32Array([
        //   fx / tw,
        //   fy / th,
        //   (fx + fw) / tw,
        //   fy / th,
        //   (fx + fw) / tw,
        //   (fy + fh) / th,
        //   fx / tw,
        //   (fy + fh) / th,
        // ]);

        // this.x0 = frame.x / tw;
        // this.y0 = frame.y / th;

        // this.x1 = (frame.x + frame.width) / tw;
        // this.y1 = frame.y / th;

        // this.x2 = (frame.x + frame.width) / tw;
        // this.y2 = (frame.y + frame.height) / th;

        // this.x3 = frame.x / tw;
        // this.y3 = (frame.y + frame.height) / th;

        projects[pName].frameRefs.push({
          frame,
          texture: png,
          uv,
        });
        return projects;
      }, projects);
      return projects;
    }, {});

    this.projects = Object.values(projectsMap).map((item) => {
      item.frameRefs.sort((a, b) =>
        a.frame.filename.localeCompare(b.frame.filename)
      );
      return item;
    });
    this.hasProjects = true;
  }
}

export const createMeshFactory = () => {
  return new SpriteMeshFactory();
};
