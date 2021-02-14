import { Vec } from "@thi.ng/vectors";

export interface AttributeEvent {
  data: Record<string, Float32Array>;
  type: "attribute";
}
