import { M as Matrix4, R as Raycaster, V as Vector3, P as Plane, G as GridHelper, a as Group, b as PointLight, c as PointLightHelper, D as DirectionalLight, d as DirectionalLightHelper, W as WebGLRenderer, B as BoxGeometry, S as SphereGeometry, e as PlaneGeometry, C as CircleGeometry, f as MeshBasicMaterial, g as MeshLambertMaterial, h as MeshPhongMaterial, i as MeshStandardMaterial, j as Mesh, I as InstancedMesh, O as Object3D, k as Vector4, l as Scene, m as OrthographicCamera, n as Clock, o as PerspectiveCamera, A as AmbientLight, H as HemisphereLight, p as CameraHelper, q as BackSide, L as Light, r as SpotLight, s as Spherical, t as DataTexture, F as FloatType, U as UVMapping, u as ClampToEdgeWrapping, N as NearestFilter, v as RedFormat, w as LuminanceAlphaFormat, x as RGBFormat, y as RGBAFormat, z as WebGLRenderTarget, E as RawShaderMaterial, J as DoubleSide, K as BufferGeometry, Q as BufferAttribute, T as LineSegments, X as Vector2, Y as Points } from '../common/three.module-7abe87b0.js';
import { f as forceStream, p as particleStream, a as forceFriction } from '../common/particle-376379e6.js';
import { S as Stream, r as reactive } from '../common/stream-6698d67f.js';
import { s as set3 } from '../common/set-260c7c36.js';
import { s as sync } from '../common/stream-sync-5cd19a97.js';
import { c as comp } from '../common/comp-b69ffdf6.js';
import { m as map } from '../common/map-ab3a157d.js';
import { f as filter } from '../common/filter-75019789.js';
import { s as sub3 } from '../common/dist-ed974f7e.js';
import { b as add3 } from '../common/add-24a0ae37.js';
import { g as gestureStream } from '../common/gesture-stream-dcb76ce0.js';
import { O as OrbitControls } from '../common/OrbitControls-11c283ba.js';
import { r as range2d } from '../common/range2d-1c91cf24.js';
import { f as fromRAF } from '../common/raf-2533ce82.js';
import { k as keyboardStream } from '../common/keyboard-stream-b55f7ffd.js';
import { g as gpgpuSetup, c as compileProgramAst, p as particleLinesProgram, a as particlePointsProgram } from '../common/ast-compile-helpers-fffc4db5.js';
import '../common/muln-5d44e24a.js';
import '../common/codegen-6bdfa5cb.js';
import '../common/unsupported-d467609e.js';
import '../common/deferror-480a42fb.js';
import '../common/range-90bff8dc.js';
import '../common/interval-eabb0a00.js';
import '../common/subscription-a6e19b11.js';
import '../common/logger-b9e6479b.js';
import '../common/is-plain-object-24968a48.js';
import '../common/implements-function-c507affc.js';
import '../common/is-array-a7fa88fb.js';
import '../common/distsq-6316f3e1.js';
import '../common/event-358f6fc3.js';
import '../common/is-boolean-6acf0f42.js';
import '../common/is-node-e2ac186a.js';
import '../common/_node-resolve:empty-5550de3c.js';
import '../common/item-0dc2ff74.js';
import '../common/deferror-f4141613.js';
import '../common/is-string-40d6c094.js';
import '../common/is-number-dd4646bb.js';
import '../common/swizzle-b9f66e93.js';
import '../common/texture-5272c311.js';
import '../common/target-1201c05a.js';
import '../common/target-6ab9d31f.js';
import '../common/math-ac89117e.js';

function resizeObserverStream(domElement, opts = { box: "border-box" }) {
    return new Stream((stream) => {
        const callback = (entries) => {
            const entry = entries[0];
            const width = entry.contentRect.width;
            const height = entry.contentRect.height;
            stream.next({ width, height, entry, domElement });
        };
        stream.next({ width: 0, height: 0, entry: null, domElement });
        const observer = new ResizeObserver(callback);
        observer.observe(domElement, opts);
        return () => {
            observer.disconnect();
        };
    });
}

/**
 * Optimized memoization for single arg functions. If the function
 * expects args other than strings or numbers, you MUST provide a `Map`
 * implementation which supports value (rather than object) equality,
 * e.g. one of those provided by
 * {@link @thi.ng/associative# | @thi.ng/associative}. Using a native
 * `Map` type here will lead to memory leaks! Alternatively, use
 * {@link (memoizeJ:1)}.
 *
 * @param fn -
 * @param cache -
 */
const memoize1 = (fn, cache) => {
    !cache && (cache = new Map());
    return (x) => {
        let res;
        return cache.has(x)
            ? cache.get(x)
            : (cache.set(x, (res = fn(x))), res);
    };
};

var GeometryAlignment;
(function (GeometryAlignment) {
    GeometryAlignment["CENTER"] = "center";
    GeometryAlignment["BOTTOM"] = "bottom";
    GeometryAlignment["TOP"] = "top";
    GeometryAlignment["LEFT"] = "left";
    GeometryAlignment["RIGHT"] = "right";
    GeometryAlignment["FRONT"] = "front";
    GeometryAlignment["BACK"] = "back";
})(GeometryAlignment || (GeometryAlignment = {}));
class GeometryFactory {
    constructor() {
        this.map = new Map();
    }
    register(id, create) {
        const createForAlignment = memoize1((alignment) => {
            const geom = create();
            return alignGeometry[alignment](geom);
        });
        const alignments = Object.values(GeometryAlignment);
        alignments.forEach((align) => {
            const lookup = this.getID(id, align);
            this.map.set(lookup, {
                handle: false,
                create: () => createForAlignment(align),
            });
        });
    }
    getID(id, alignment) {
        return [id, alignment].join("/");
    }
    create(id, alignment = GeometryAlignment.CENTER) {
        const lookup = this.getID(id, alignment);
        return this.map.get(lookup).create();
    }
}
const boundingBox = (geometry) => {
    if (!geometry.boundingBox) {
        geometry.computeBoundingBox();
    }
    return geometry.boundingBox;
};
const alignGeometry = {
    [GeometryAlignment.CENTER]: (geometry) => {
        return geometry;
    },
    [GeometryAlignment.BOTTOM]: (geometry) => {
        const bounds = boundingBox(geometry);
        return geometry.applyMatrix4(new Matrix4().makeTranslation(0, -bounds.min.y, 0));
    },
    [GeometryAlignment.TOP]: (geometry) => {
        const bounds = boundingBox(geometry);
        return geometry.applyMatrix4(new Matrix4().makeTranslation(0, bounds.min.y, 0));
    },
    [GeometryAlignment.LEFT]: (geometry) => {
        const bounds = boundingBox(geometry);
        return geometry.applyMatrix4(new Matrix4().makeTranslation(-bounds.min.x, 0, 0));
    },
    [GeometryAlignment.RIGHT]: (geometry) => {
        const bounds = boundingBox(geometry);
        return geometry.applyMatrix4(new Matrix4().makeTranslation(bounds.min.x, 0, 0));
    },
    [GeometryAlignment.FRONT]: (geometry) => {
        const bounds = boundingBox(geometry);
        return geometry.applyMatrix4(new Matrix4().makeTranslation(0, 0, bounds.min.z));
    },
    [GeometryAlignment.BACK]: (geometry) => {
        const bounds = boundingBox(geometry);
        return geometry.applyMatrix4(new Matrix4().makeTranslation(0, 0, -bounds.min.z));
    },
};

/**
 *
 * Some WIP geometries for 'trail' style objects that
 * will eventually be extruded along a path either on the CPU/GPU.
 *
 */
new Matrix4().makeRotationZ(Math.PI);

const dragGesture3d = (gesture$, opts = {}) => {
    const { maxSpeed = 0.8, friction = 0.12, initialPosition = [0, 0, 0] } = opts;
    // gesture position
    let translate;
    let delta;
    let start;
    let previous;
    // particle position
    let particleStart;
    let isDragging = false;
    let time = 0;
    const threshold = 0.005;
    const [force$, setForces] = forceStream([], []);
    const particle$ = particleStream(force$, reactive({ maxSpeed, threshold }));
    const frictionF = forceFriction(friction);
    set3(particle$.deref().data.position, initialPosition);
    let lastp = null;
    return sync({
        src: {
            particle: particle$,
            gesture: gesture$,
        },
        xform: comp(filter(({ gesture, particle }) => {
            const pchanged = particle !== lastp;
            lastp = particle;
            return (gesture.type !== "move" && gesture.type !== "zoom") || pchanged;
        }), map(({ gesture, particle }) => {
            switch (gesture.type) {
                case "start":
                    start = gesture.pos;
                    previous = start;
                    translate = [0, 0, 0]; // difference between start and end
                    delta = [0, 0, 0]; // difference between frame
                    isDragging = true;
                    particleStart = [...particle.data.position];
                    time = Date.now();
                    break;
                case "end":
                    // gesture will remain in stream buffer until removed.
                    // so test event end
                    if (isDragging) {
                        isDragging = false;
                        setForces([frictionF], [() => delta]);
                    }
                    break;
                case "drag":
                    translate = sub3([], gesture.pos, start);
                    const now = Date.now();
                    // calc delta with time offset since previous pos
                    if (now - time > 25) {
                        delta = sub3([], gesture.pos, previous);
                        previous = gesture.pos;
                        time = now;
                    }
                    set3(particle.data.position, add3([], particleStart, translate));
                    break;
            }
            return {
                gesture,
                particle,
            };
        })),
    });
};

var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const gestureStream3d = (domElement, camera, resize, opts = {}) => {
    const { normal = [0, 1, 0] } = opts, _opts = __rest(opts, ["normal"]);
    const raycaster = new Raycaster();
    const position = new Vector3(0, 0, 0);
    const norm = new Vector3();
    norm.fromArray(normal);
    const plane = new Plane(norm);
    const ndc = new Vector3();
    const setPlaneNormal = (x, y, z) => {
        norm.set(x, y, z);
        plane.set(norm, 0);
    };
    return gestureStream(domElement, Object.assign(Object.assign({}, _opts), { eventOpts: {} })).transform(map((event) => {
        const { width, height } = resize.deref();
        const { pos } = event;
        const [x, y] = pos;
        ndc.x = (x / width) * 2.0 - 1.0;
        ndc.y = -(y / height) * 2.0 + 1.0;
        raycaster.setFromCamera(ndc, camera);
        raycaster.ray.intersectPlane(plane, position);
        return Object.assign(Object.assign({}, event), { ndc, isDown: event.active.length > 0, plane,
            raycaster, is3d: true, position, pos: position.toArray(), setPlaneNormal });
    }));
};

const orbitControls = (camera, container) => {
    return new OrbitControls(camera, container);
};

/**
 * Add debug helpers to lights found in the given object.
 * @param obj
 */
const createLightHelpers = (obj) => {
    const group = new Group();
    const helpers = [];
    obj.traverse((obj) => {
        if (obj instanceof PointLight) {
            helpers.push(pointLightHelper(obj));
        }
        else if (obj instanceof DirectionalLight) {
            helpers.push(directionalLightHelper(obj));
        }
    });
    group.add.apply(group, helpers);
    return group;
};
const pointLightHelper = (light, size = 0.2, color = "yellow") => {
    return new PointLightHelper(light, size, color);
};
const directionalLightHelper = (light, size = 0.2, color = "yellow") => {
    return new DirectionalLightHelper(light, size, color);
};
const createGridHelper = (size = 10, divisions = 10, color1 = "yellow", color2 = "blue") => new GridHelper(size, divisions, color1, color2);

/**
 * Create a WebGLRenderer and add it to the supplied dom element.
 * If no element is supplied, document.body is used.
 *
 * The domElement is watched for resize using a ResizeObserver. This is returned as a resize observer stream.
 *
 * @param domElement
 * @param params
 */
const createRenderer = (mountElement, params) => {
    const mount = mountElement || document.body;
    const renderer = new WebGLRenderer(Object.assign({ antialias: true }, params));
    const domElement = createContainer(renderer.domElement);
    mount.appendChild(domElement);
    const resize = resizeObserverStream(domElement);
    resize.subscribe({
        next: ({ entry, width, height }) => {
            renderer.setSize(width, height);
        },
    });
    return { resize, domElement, renderer };
};
const createContainer = (canvas) => {
    const element = document.createElement("div");
    element.style.position = "absolute";
    element.style.width = "100%";
    element.style.height = "100%";
    element.appendChild(canvas);
    return element;
};

function createGeometryFactory() {
    const factory = new GeometryFactory();
    factory.register("box", () => new BoxGeometry());
    factory.register("sphere", () => new SphereGeometry());
    factory.register("plane", () => new PlaneGeometry());
    factory.register("circle", () => new CircleGeometry(1, 30));
    return factory;
}
createGeometryFactory();

class MeshFactory {
    constructor() {
        this.geometryFactory = createGeometryFactory();
        this.scale = new Vector3(1, 1, 1);
        this.setMaterial({
            color: "white",
        }, MeshBasicMaterial);
        this.sphere();
    }
    setGeometry(geometry) {
        this.nextGeometry = geometry;
    }
    plane(align) {
        this.setGeometry(this.geometryFactory.create("plane", align));
    }
    sphere(align) {
        this.setGeometry(this.geometryFactory.create("sphere", align));
    }
    box(align) {
        this.setGeometry(this.geometryFactory.create("box", align));
    }
    setMaterial(params, cls) {
        this.nextMaterialParams = params;
        this.nextMaterialClass = cls;
    }
    basicMaterial(params) {
        this.setMaterial(params, MeshBasicMaterial);
    }
    lambertMaterial(params) {
        this.setMaterial(params, MeshLambertMaterial);
    }
    phongMaterial(params) {
        this.setMaterial(params, MeshPhongMaterial);
    }
    standardMaterial(params) {
        this.setMaterial(params, MeshStandardMaterial);
    }
    mesh(parent) {
        const mesh = new Mesh(this.nextGeometry, new this.nextMaterialClass(this.nextMaterialParams));
        if (parent) {
            parent.add(mesh);
        }
        mesh.scale.copy(this.scale);
        return mesh;
    }
}
const createMeshFactory = () => {
    return new MeshFactory();
};

const createInstancedMesh = (geometry, material, count) => {
    return new InstancedMesh(geometry, material, count);
};
const instancedMeshIterator = (mesh) => {
    const tmp = new Object3D();
    return (fn) => {
        for (let i = 0; i < mesh.count; i++) {
            tmp.rotation.set(0, 0, 0);
            tmp.position.set(0, 0, 0);
            tmp.scale.set(1, 1, 1);
            fn(i, tmp.position, tmp.scale, tmp.rotation);
            tmp.updateMatrix();
            mesh.setMatrixAt(i, tmp.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
    };
};

/**
 *
 * Helper functions for rendering various types
 * to rectangular regions of the viewport.
 *
 */
/**
 * Temp helper objects.
 */
const tmp = (() => {
    const viewport = new Vector4();
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const material = new MeshBasicMaterial({
        color: "white",
    });
    const geometry = new PlaneGeometry(2, 2);
    const mesh = new Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);
    return {
        viewport,
        scene,
        camera,
        material,
        mesh,
    };
})();
/**
 *
 * Render to a single viewport rectangle.
 *
 * @param renderer
 * @param rect
 * @param render
 */
const renderViewportRect = (renderer, rect, render) => {
    renderViewportRects(renderer, [rect], render);
};
/**
 *
 * Render to multiple viewport rectangles.
 *
 * @param renderer
 * @param rects
 * @param render
 */
const renderViewportRects = (renderer, rects, render) => {
    renderer.getViewport(tmp.viewport);
    renderer.setScissorTest(true);
    rects.forEach((rect) => {
        renderer.setViewport(rect.x, rect.y, rect.width, rect.height);
        renderer.setScissor(rect.x, rect.y, rect.width, rect.height);
        renderer.clearDepth();
        render(renderer, rect);
    });
    renderer.setViewport(tmp.viewport);
    renderer.setScissorTest(false);
};
/**
 *
 * Render a texture to the given viewport Rect.
 *
 * @param renderer
 * @param opts
 */
const renderViewportTexture = (renderer, texture, rect) => {
    tmp.material.map = texture;
    renderViewportRect(renderer, rect, () => {
        renderer.render(tmp.scene, tmp.camera);
    });
};
/**
 *
 * Render a number of regions in a grid.
 *
 * @param renderer
 * @param opts
 */
const renderViewportGrid = (renderer, opts) => {
    const [gx, gy] = opts.grid;
    const { width, height } = renderer.getContext().canvas;
    const pr = renderer.getPixelRatio();
    const vw = width / pr / gx;
    const vh = height / pr / gy;
    renderer.setScissorTest(true);
    [...range2d(gx, gy)].map(([x, y], i) => {
        renderer.setScissor(vw * x, vh * y, vw, vh);
        renderer.setViewport(vw * x, vh * y, vw, vh);
        opts.render(i, [x, y], [vw, vh]);
    });
    renderer.setScissorTest(false);
};

function rafClockStream() {
    const clock = new Clock();
    return fromRAF().transform(map((i) => {
        return {
            clock,
            delta: clock.getDelta(),
            time: clock.getElapsedTime(),
            frame: i,
        };
    }));
}

function createSketch(setup, container) {
    const { domElement, renderer, resize } = createRenderer(container);
    renderer.setPixelRatio(2);
    const scene = new Scene();
    const camera = new PerspectiveCamera(45);
    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);
    resize.subscribe({
        next: ({ width, height }) => {
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        },
    });
    let userRender;
    const render = (render) => {
        userRender = render;
    };
    const clock = rafClockStream();
    clock.subscribe({
        next: ({ delta, frame, time }) => {
            if (userRender) {
                const autoRender = userRender({
                    delta,
                    frame,
                    time,
                });
                // Return false to prevent automatically rendering the default scene and camera
                if (autoRender || autoRender === undefined) {
                    renderer.render(scene, camera);
                }
            }
        },
    });
    const controls = orbitControls(camera, renderer.domElement);
    controls.enabled = false;
    const gestures = gestureStream3d(renderer.domElement, camera, resize);
    const keyboard = keyboardStream({
        listen: [" "],
    });
    keyboard.subscribe({
        next: ({ isKeyDown, keysDown, keysToggled }) => {
            controls.enabled = isKeyDown;
        },
    });
    const configure = (config) => {
        // resize observer will trigger a renderer resize
        domElement.style.width = config.width.toString();
        domElement.style.height = config.height.toString();
    };
    domElement.style.touchAction = "none";
    setup({
        domElement,
        renderer,
        scene,
        camera,
        resize,
        render,
        clock,
        configure,
        controls,
        gestures,
        keyboard,
    });
}
const sketch = createSketch;

const mergeOpts = (opts) => {
    let last = opts;
    return map((x) => {
        last = Object.assign(Object.assign({}, last), x);
        return last;
    });
};
const reactiveOptsFactory = (defaultOpts) => {
    return (opts) => {
        return new Stream(($) => {
            $.next(Object.assign({}, opts));
        }).subscribe(mergeOpts(defaultOpts));
    };
};
/**
const testOpts = reactiveOptsFactory<{ opt1: number; opt2?: number }>({
  opt1: 10,
  opt2: 20,
});

 */

const mf = createMeshFactory();
const createDome = (parent) => {
    const dome = new SphereGeometry(1, 20, 30).applyMatrix4(new Matrix4().makeRotationX(Math.PI * -0.5));
    mf.setGeometry(dome);
    mf.lambertMaterial({
        color: "crimson",
        emissive: "red",
        emissiveIntensity: 0.2,
        side: BackSide,
    });
    return mf.mesh(parent);
};
const createFloor = (parent, color = "crimson") => {
    // Floor
    mf.lambertMaterial({
        color: "crimson",
        emissive: "crimson",
        emissiveIntensity: 0.2,
    });
    mf.scale.multiplyScalar(10);
    mf.plane();
    const floor = mf.mesh(parent);
    floor.rotation.x = Math.PI * -0.5;
    return floor;
};
const createDomeSimpleOpts = reactiveOptsFactory({
    color: "crimson",
    intensity: [0.2, 0.4, 0.3],
    emissive: {
        intensity: [0.1, 0.2],
        offset: [
            [0, 0, 0],
            [0, 0, 0], // floor
        ],
    },
    showHelpers: true,
});
/**
 *
 * A mimimal dome and light setup.
 * Designed for reuse without major configurations.
 *
 * @param parent
 * @param opts
 */
const createDomeSimpleLight = (parent, opts = createDomeSimpleOpts({})) => {
    mf.scale.set(1, 1, 1);
    const dome = createDome(parent);
    dome.scale.multiplyScalar(30);
    const floor = createFloor(parent);
    floor.scale.multiplyScalar(10);
    floor.receiveShadow = true;
    const amb = new AmbientLight();
    const dir = new DirectionalLight();
    const hem = new HemisphereLight();
    const lights = [amb, dir, hem];
    parent.add(amb, hem, dir);
    dir.castShadow = true;
    dir.shadow.camera.far = 50;
    dir.shadow.camera.near = 5;
    dir.shadow.camera.left = -10;
    dir.shadow.camera.right = 10;
    dir.shadow.camera.top = 10;
    dir.shadow.camera.bottom = -10;
    const shadowHelper = new CameraHelper(dir.shadow.camera);
    parent.add(shadowHelper);
    dir.position.set(2, 4, 5).multiplyScalar(4);
    const helpers = createLightHelpers(parent);
    parent.add(helpers);
    opts.subscribe({
        next: ({ color, intensity, emissive, showHelpers }) => {
            // Apply color
            amb.intensity = intensity[0];
            dir.intensity = intensity[1];
            hem.intensity = intensity[2];
            const dm = dome.material;
            const fm = floor.material;
            // Set color to the same
            dm.color.set(color);
            fm.color.set(color);
            dm.emissive.set(color);
            fm.emissive.set(color);
            dm.emissiveIntensity = emissive.intensity[0];
            fm.emissiveIntensity = emissive.intensity[1];
            dm.emissive.offsetHSL.apply(dm.emissive, emissive.offset[0]);
            fm.emissive.offsetHSL.apply(fm.emissive, emissive.offset[1]);
            helpers.visible = showHelpers;
            shadowHelper.visible = showHelpers;
        },
    });
    opts.next({});
    return {
        opts,
        dome,
        lights,
        floor,
        helpers,
    };
};

const linear = (t) => t;
const createLightingRigOpts = reactiveOptsFactory({
    count: 3,
    types: "HPD",
    radius: 10,
    intensityDist: linear,
    intensityMin: 0.1,
    intensityMax: 1,
    azimuthAngle: 45,
    azimuthDist: linear,
    azimuthVariance: 1,
    polarAngle: 45,
    polarDist: linear,
    polarVariance: 1,
});
const parseLights = (types) => {
    return types.split("").map((char) => {
        switch (char) {
            case "A":
                return new AmbientLight();
            case "H":
                return new HemisphereLight();
            case "P":
                return new PointLight();
            case "D":
                return new DirectionalLight();
            case "S":
                return new SpotLight();
            default:
                console.warn(`Unrecognised light type '${char}'`);
                return new Light();
        }
    });
};
const distribute = (lights, ease, apply, filter = () => true) => {
    const filtered = lights.filter(filter);
    filtered.forEach((light, i) => {
        const value = ease(i / (filtered.length - 1) || 0);
        apply(light, value);
    });
};
const assignIntensity = (lights, opts) => {
    distribute(lights, opts.intensityDist, (light, value) => {
        light.intensity =
            opts.intensityMin + value * (opts.intensityMax - opts.intensityMin);
    });
};
const filterAngleLights = (light) => !light.isHemisphereLight && !light.isAmbientLight;
const toRadians = Math.PI / 180;
const assignAngles = (lights, sph, opts) => {
    const filtered = lights.filter(filterAngleLights);
    const len = filtered.length;
    for (let i = 0; i < len; i++) {
        const N = i / (len - 1) || 0;
        const theE = opts.azimuthDist(N);
        const phiE = opts.polarDist(N);
        const phiStart = opts.polarAngle * toRadians;
        const theStart = opts.azimuthAngle * toRadians;
        sph.set(opts.radius, phiStart + phiE * (Math.PI * opts.polarVariance), theStart + theE * (Math.PI * 2.0 * opts.azimuthVariance));
        const light = filtered[i];
        light.position.setFromSpherical(sph);
    }
};
const createLightingRig = (parent, opts) => {
    const group = new Group();
    parent.add(group);
    const sphHelper = new Spherical();
    const lights = {
        types: "none",
        lights: [],
    };
    // Would be nice to split streams across properties.
    // As some invalidation system
    // Later...
    // Look at @thi.ng/atom
    opts.subscribe({
        next: (opts) => {
            if (lights.types !== opts.types) {
                lights.lights.forEach((l) => group.remove(l));
                lights.lights = parseLights(opts.types);
                lights.lights.forEach((l) => group.add(l));
                lights.types = opts.types;
                // console.log("update lights");
            }
            lights.lights.forEach((l) => {
                if (l.type !== "AmbientLight" && l.type !== "HemisphereLight") {
                    l.castShadow = true;
                }
            });
            assignIntensity(lights.lights, opts);
            assignAngles(lights.lights, sphHelper, opts);
        },
        error: (err) => {
            throw err;
        },
    });
    // .subscribe(trace("Update Opts"));
    return {
        lights: lights.lights,
        group,
    };
};

const dataTexture = (data, width, height, size = 3) => {
    let format;
    if (size === 1) {
        format = RedFormat;
    }
    else if (size === 2) {
        format = LuminanceAlphaFormat;
    }
    else if (size === 3) {
        format = RGBFormat;
    }
    else if (size === 4) {
        format = RGBAFormat;
    }
    return new DataTexture(data, width, height, format, FloatType, UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, NearestFilter, NearestFilter);
};
const encodeFillFloat32Array3 = (count, fill) => {
    const array = new Float32Array(count * 3);
    let offset = 0;
    for (let i = 0; i < array.length; i += 3) {
        fill(array, offset);
        offset += 3;
    }
    return array;
};
const encodeFillDataTexture3 = (width, height, fill) => {
    const array = encodeFillFloat32Array3(width * height, fill);
    return dataTexture(array, width, height, 3);
};

const createTexture = (width, height) => {
    return new WebGLRenderTarget(width, height, {
        format: RGBAFormat,
        type: FloatType,
        // mapping: UVMapping,
        wrapS: ClampToEdgeWrapping,
        wrapT: ClampToEdgeWrapping,
        minFilter: NearestFilter,
        magFilter: NearestFilter,
        stencilBuffer: false,
        depthBuffer: false,
    });
};
const createGeometry = (buffer) => {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(buffer, 3));
    return geometry;
};
class GPGPUState {
    /**
     *
     * @param renderer
     * @param setup
     */
    constructor(renderer, setup) {
        this.scene = new Scene();
        this.setup = setup;
        this.renderer = renderer;
        // Create state textures.
        this.states = new Array(setup.count)
            .fill(0)
            .map(() => createTexture(setup.width, setup.height));
        // Main ping/pong update material
        this.material = new RawShaderMaterial({
            vertexShader: setup.vertexSource,
            fragmentShader: setup.fragmentSource,
            depthTest: false,
            depthWrite: false,
            // side: setup.geomType === "triangle" ? BackSide : FrontSide,
            side: DoubleSide,
            uniforms: {
                // TODO: need to make dynamic
                state_1: { value: null },
                state_2: { value: null },
            },
        });
        // Material to write a data texture to the output buffer.
        this.writeMaterial = new RawShaderMaterial({
            vertexShader: setup.vertexSource,
            fragmentShader: setup.fragmentWriteSource,
            depthTest: false,
            depthWrite: false,
            side: DoubleSide,
            uniforms: {
                inputSource: { value: null },
            },
        });
        this.geometry = createGeometry(setup.positionBuffer);
        this.mesh = new Mesh(this.geometry, this.material);
        this.camera = new OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1);
        this.scene.add(this.mesh);
    }
    /**
     * Set the supplied data as all states and
     * write it to the current output buffer.
     *
     * This is replaces the current state and
     * @param data
     */
    write(data) {
        this.writeMaterial.uniforms["inputSource"].value = data;
        this.mesh.material = this.writeMaterial;
        // TODO : unnecessary to write all states.
        this.states.forEach((state) => {
            this.renderer.setRenderTarget(state);
            this.renderer.render(this.scene, this.camera);
        });
        this.renderer.setRenderTarget(null);
        this.mesh.material = this.material;
    }
    /**
     * Update the state using the supplied update shader.
     * Number of state textures should be equal to count + 1,
     * as the the texture in state[0] will be the output
     * texture.
     */
    update() {
        // Update state uniforms
        // this.states.forEach((state, i) => {
        //   this.material.uniforms[`state_${i}`].value = state.texture;
        // });
        // Render
        this.material.uniforms["state_1"].value = this.states[1].texture;
        if (this.states.length >= 3) {
            this.material.uniforms["state_2"].value = this.states[2].texture;
        }
        this.renderer.setRenderTarget(this.states[0]);
        this.renderer.render(this.scene, this.camera);
        this.renderer.setRenderTarget(null);
        this.nextState();
    }
    get output() {
        return this.states[0];
    }
    /**
     * Return a preview texture ( that is not being rendered to next )
     */
    get preview() {
        return this.states[1];
    }
    /**
     * Advance the states along from left to right.
     * The texture in the state[0] position will
     * be the next output buffer.
     *
     * State at > state[1] can be used as a texture for preview.
     */
    nextState() {
        let prevState = this.states[this.states.length - 1];
        for (let i = 0; i < this.states.length; i++) {
            let current = this.states[i];
            this.states[i] = prevState;
            prevState = current;
        }
    }
}

const createStateTextureAst = (renderer, opts) => {
    const setup = gpgpuSetup(opts);
    return new GPGPUState(renderer, setup);
};

const particleStateLinesMaterial = () => {
    const { fragmentSource, vertexSource } = compileProgramAst(particleLinesProgram());
    const material = new RawShaderMaterial({
        // vertexColors: addColor,
        vertexShader: vertexSource,
        fragmentShader: fragmentSource,
        linewidth: 2,
    });
    material.uniforms["state_1"] = { value: null };
    material.uniforms["state_2"] = { value: null };
    material.uniforms["resolution"] = { value: new Vector2() };
    return material;
};
/**
 *
 * Particle State.
 * Lines Geometry.
 */
const particleStateLinesGeometry = (count, color) => {
    const geometry = new BufferGeometry();
    const position = new BufferAttribute(new Float32Array(count * 3 * 2).fill(0), 3);
    // Offsets span from 0 to count * 2.
    // From this, the line segment start and end is determined by offset % 2
    // And the offset for reading from the texture is offset / 2
    const offset = new BufferAttribute(new Float32Array(
    // new Array(count * 2).fill(0).map((_v, i) => Math.floor(i / 2))
    new Array(count * 2).fill(0).map((_v, i) => i)), 1);
    geometry.setAttribute("position", position);
    geometry.setAttribute("offset", offset);
    if (color) {
        geometry.setAttribute("color", color);
    }
    return geometry;
};
/**
 *
 * Particle State.
 * Lines Rendering.
 *
 */
class ParticleStateLineSegments extends LineSegments {
    constructor(count, state, color) {
        super(particleStateLinesGeometry(count, color), particleStateLinesMaterial());
        this.onBeforeRender = () => {
            const material = this.material;
            material.uniforms.state_1.value = this.state.preview.texture;
            material.uniforms.state_2.value = this.state.states[2].texture;
            material.uniforms.resolution.value.x = this.state.setup.width;
            material.uniforms.resolution.value.y = this.state.setup.height;
        };
        this.state = state;
        if (this.state.states.length < 3) {
            throw new Error("Lines segment renderer needs an additional state[2] to render.");
        }
    }
}
const createParticleStateLineSegments = (count, state, color) => {
    return new ParticleStateLineSegments(count, state, color);
};

const particleStatePointsMaterial = (addColor) => {
    const { fragmentSource, vertexSource } = compileProgramAst(particlePointsProgram());
    const material = new RawShaderMaterial({
        vertexShader: vertexSource,
        fragmentShader: fragmentSource,
    });
    material.uniforms["state_1"] = { value: null };
    material.uniforms["point_size"] = { value: 5.0 };
    material.uniforms["resolution"] = { value: new Vector2() };
    return material;
};
/**
 *
 * Particle State.
 * Points Geometry.
 *
 */
const particleStatePointsGeometry = (count, color) => {
    const geometry = new BufferGeometry();
    const position = new BufferAttribute(new Float32Array(count * 3).fill(0), 3);
    const offset = new BufferAttribute(new Float32Array(new Array(count).fill(0).map((_v, i) => i)), 1);
    geometry.setAttribute("position", position);
    geometry.setAttribute("offset", offset);
    if (color) {
        geometry.setAttribute("color", color);
    }
    return geometry;
};
/**
 *
 * Particle State.
 * Points Rendering.
 *
 */
class ParticleStatePoints extends Points {
    constructor(count, state, color) {
        super(particleStatePointsGeometry(count, color), particleStatePointsMaterial());
        this.onBeforeRender = () => {
            const material = this.material;
            material.uniforms.state_1.value = this.state.preview.texture;
            material.uniforms.resolution.value.x = this.state.setup.width;
            material.uniforms.resolution.value.y = this.state.setup.height;
        };
        this.state = state;
    }
}
const createParticleStatePoints = (count, state, color) => {
    return new ParticleStatePoints(count, state, color);
};

export { GeometryAlignment, createDomeSimpleLight, createDomeSimpleOpts, createGeometryFactory, createGridHelper, createInstancedMesh, createLightingRig, createLightingRigOpts, createMeshFactory, createParticleStateLineSegments, createParticleStatePoints, createStateTextureAst, dragGesture3d, encodeFillDataTexture3, gestureStream3d, instancedMeshIterator, renderViewportGrid, renderViewportTexture, sketch };
