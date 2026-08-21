import { ApiError } from "../utils/ApiError.js";
import { env } from "../config/env.js";

export function notFoundHandler(req, _res, next) {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars -- Express identifies error handlers by arity.
export function errorHandler(error, _req, res, _next) {
  let statusCode = error.statusCode ?? 500;
  let message = error.message ?? "Something went wrong";
  let details = error.details;

  // Translate the mongoose/jwt failures the routes can actually produce.
  if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    details = Object.fromEntries(
      Object.entries(error.errors).map(([field, err]) => [field, err.message]),
    );
  } else if (error.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${error.path}: ${error.value}`;
  } else if (error.code === 11000) {
    statusCode = 409;
    message = `Duplicate value for ${Object.keys(error.keyValue ?? {}).join(", ")}`;
  } else if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Session expired — please sign in again";
  }

  if (statusCode >= 500) console.error(error);

  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {}),
    ...(env.isProd ? {} : { stack: error.stack }),
  });
}
