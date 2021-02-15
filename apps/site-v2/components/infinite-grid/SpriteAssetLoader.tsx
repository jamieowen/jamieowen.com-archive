import { FC, ReactNode, useEffect, useState, Fragment } from "react";
import { Texture, TextureLoader } from "three";

export interface LoadState {
  loaded: boolean;
  loading: boolean;
  currentAssets: SpriteAsset[];
}
export interface AssetLoaderProps {
  urls: string[];
  children: (loadState: LoadState) => ReactNode;
}

export interface Frame {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SpriteSourceSize {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Size {
  w: number;
  h: number;
}

export interface SpriteFrame {
  filename: string;
  frame: Frame;
  rotated: boolean;
  trimmed: boolean;
  spriteSourceSize: SpriteSourceSize;
  sourceSize: Size;
}

export interface Meta {
  app: string;
  version: string;
  image: string;
  format: string;
  size: Size;
  scale: string;
  related_multi_packs: string[];
  smartupdate: string;
}

export interface SpriteJson {
  frames: SpriteFrame[];
  meta: Meta;
}

export type SpriteAsset = [
  url: string,
  ext: string,
  data: SpriteJson | Texture
];

class Loader {
  results: any[] = [];
  constructor(
    private urls: string[],
    private onComplete: (results: any[]) => void
  ) {}

  start() {
    this.next();
  }

  dispose() {
    console.log("DISPOSE LOADER!!");
  }

  private next() {
    if (this.urls.length === 0) {
      this.onComplete(this.results);
      return;
    }
    const url = this.urls.pop();
    const ext = url.split(".").slice(-1)[0];
    // console.log("Next Asset..", ext, url);

    if (ext === "json") {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.results.push([url, ext, data]);
          this.next();
        });
    } else {
      const loader = new TextureLoader();
      loader.load(url, (texture) => {
        this.results.push([url, ext, texture]);
        this.next();
      });
    }
  }
}
export const SpriteAssetLoader: FC<AssetLoaderProps> = ({ urls, children }) => {
  const [loadState, setLoadState] = useState<LoadState>({
    currentAssets: [],
    loaded: false,
    loading: false,
  });
  useEffect(() => {
    const loader = new Loader(urls, (result) => {
      setLoadState({
        currentAssets: result,
        loaded: true,
        loading: false,
      });
    });
    loader.start();
    return () => {
      loader.dispose();
    };
  }, [urls]);
  return <Fragment>{children(loadState)}</Fragment>;
};
