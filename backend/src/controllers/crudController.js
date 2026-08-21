import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * Every list section (skills, experience, education, certifications, projects,
 * services, achievements) behaves identically, so they share one controller.
 * `sort` defaults to the manual `order` field the admin's drag-to-reorder sets.
 */
export function crudController(Model, { label = "Item", sort = { order: 1, createdAt: 1 } } = {}) {
  const findOr404 = async (id) => {
    const doc = await Model.findById(id);
    if (!doc) throw ApiError.notFound(`${label} not found`);
    return doc;
  };

  return {
    list: asyncHandler(async (req, res) => {
      const filter = {};
      if (req.query.published === "true") filter.published = true;
      if (req.query.published === "false") filter.published = false;
      const items = await Model.find(filter).sort(sort);
      res.json({ success: true, count: items.length, data: items });
    }),

    get: asyncHandler(async (req, res) => {
      res.json({ success: true, data: await findOr404(req.params.id) });
    }),

    create: asyncHandler(async (req, res) => {
      // New rows land at the end of the list unless the caller pins an order.
      if (req.body.order === undefined) {
        const last = await Model.findOne().sort({ order: -1 }).select("order");
        req.body.order = (last?.order ?? -1) + 1;
      }
      const doc = await Model.create(req.body);
      res.status(201).json({ success: true, message: `${label} created`, data: doc });
    }),

    update: asyncHandler(async (req, res) => {
      const doc = await findOr404(req.params.id);
      doc.set(req.body);
      await doc.save();
      res.json({ success: true, message: `${label} updated`, data: doc });
    }),

    remove: asyncHandler(async (req, res) => {
      const doc = await findOr404(req.params.id);
      await doc.deleteOne();
      res.json({ success: true, message: `${label} deleted`, data: { id: req.params.id } });
    }),

    /** Accepts the full id list in its new visual order. */
    reorder: asyncHandler(async (req, res) => {
      const { ids } = req.body;
      await Model.bulkWrite(
        ids.map((id, index) => ({
          updateOne: { filter: { _id: id }, update: { $set: { order: index } } },
        })),
      );
      const items = await Model.find().sort(sort);
      res.json({ success: true, message: "Order saved", data: items });
    }),
  };
}
