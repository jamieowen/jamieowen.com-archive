import * as hiccupSvg from "@thi.ng/hiccup-svg";
import * as hiccup from "@thi.ng/hiccup";
import { Vec } from "@thi.ng/vectors";
import { BoundsNode } from "../nodes";

export type SvgRenderOpts = {
  asString: boolean;
  size: Vec;
};

const defaultOpts: SvgRenderOpts = {
  asString: false,
  size: null,
};

export function renderSvg(
  node: any,
  opts?: SvgRenderOpts
): SVGElement | string {
  opts = Object.assign({}, defaultOpts, opts);

  if (node instanceof BoundsNode && !opts.size) {
    opts.size = (<BoundsNode>node).bounds;
  } else if (!opts.size) {
    opts.size = [100, 100];
    console.warn(
      "No size supplied to SVG render. Wrap in BoundsNode or specify size."
    );
  }

  const attributes = {
    width: opts.size[0],
    height: opts.size[1],
  };

  const svgHic = hiccupSvg.convertTree(node);
  // console.log( 'CONVERT : ', svgHic );
  const svgHic1 = hiccupSvg.svg(attributes, svgHic);
  // console.log( 'SVG HIC :', svgHic1 );
  const svgStr = hiccup.serialize(svgHic1);

  if (opts.asString) {
    return svgStr;
  } else {
    const ele: HTMLElement = document.createElement("div");
    ele.innerHTML = svgStr;
    return <SVGElement>ele.firstChild;
  }
}
