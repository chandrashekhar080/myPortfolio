import { ApiError } from "../utils/ApiError.js";

/**
 * Validates and REPLACES req.body with the parsed result, so controllers only
 * ever see fields the schema allows — an admin cannot inject `role` or `_id`.
 */
export const validateBody = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const details = Object.fromEntries(
      result.error.issues.map((issue) => [issue.path.join(".") || "body", issue.message]),
    );
    return next(ApiError.badRequest("Validation failed", details));
  }
  req.body = result.data;
  next();
};

export const validateQuery = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.query);
  if (!result.success) {
    const details = Object.fromEntries(
      result.error.issues.map((issue) => [issue.path.join(".") || "query", issue.message]),
    );
    return next(ApiError.badRequest("Invalid query parameters", details));
  }
  req.validatedQuery = result.data;
  next();
};
