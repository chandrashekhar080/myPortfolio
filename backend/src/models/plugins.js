/**
 * Every document goes over the wire as `{ id, ... }` — the admin and the
 * frontend never see `_id` or `__v`.
 */
export function toJsonPlugin(schema) {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform(_doc, ret) {
      ret.id = ret._id?.toString();
      delete ret._id;
      delete ret.password;
      return ret;
    },
  });
}

/** Sortable list sections share the same ordering + visibility contract. */
export const orderableFields = {
  order: { type: Number, default: 0, index: true },
  published: { type: Boolean, default: true },
};
