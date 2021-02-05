import { Vec } from "@thi.ng/vectors";

/**
 * Events
 */
export interface GeometryEventBase<T = any> {
  type: string;
  data: T;
}

export interface PointEvent extends GeometryEventBase<Vec> {
  type: "point";
}

export interface PointArrayEvent extends GeometryEventBase<Vec[]> {
  type: "point-array";
}

// Vector ? Line Normals and Point Normals?

export interface LineEvent extends GeometryEventBase<Vec> {
  type: "line";
}

export interface LineArrayEvent extends GeometryEventBase<Vec[]> {
  type: "line-array";
}

export type GeometryEvent = PointEvent | PointArrayEvent;

/**
 * Source / Streams
 */

export default {};
