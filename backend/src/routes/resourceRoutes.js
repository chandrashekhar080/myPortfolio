import { Router } from "express";
import { crudController } from "../controllers/crudController.js";
import { validateBody } from "../middleware/validate.js";
import { reorderSchema } from "../validators/schemas.js";

/**
 * Wires one model + one zod schema into the standard
 * list / create / reorder / get / update / delete route set.
 */
export function resourceRouter(Model, schema, label) {
  const controller = crudController(Model, { label });
  const router = Router();

  router.route("/").get(controller.list).post(validateBody(schema), controller.create);
  router.patch("/reorder", validateBody(reorderSchema), controller.reorder);
  router
    .route("/:id")
    .get(controller.get)
    .put(validateBody(schema), controller.update)
    .patch(validateBody(schema.partial()), controller.update)
    .delete(controller.remove);

  return router;
}
