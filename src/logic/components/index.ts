import { Types, defineComponent } from "bitecs";

export const Vector3 = { x: Types.f32, y: Types.f32, z: Types.f32 };

export const PositionComponent = defineComponent(Vector3);
export const VelocityComponent = defineComponent(Vector3);
// For unknown reason, 8-bit integer produced an incorrect results when using a random range of 0-255
export const ColorComponent = defineComponent({
  r: Types.i16,
  g: Types.i16,
  b: Types.i16,
});
