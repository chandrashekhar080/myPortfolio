import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import routes from "./routes/index.js";
import { ApiError } from "./utils/ApiError.js";
import { notFoundHandler, errorHandler } from "./middleware/error.js";

/** Loopback, or a private-network address such as the LAN IP Vite advertises. */
function isLocalOrigin(origin) {
  try {
    const { hostname } = new URL(origin);
    return (
      hostname === "localhost" ||
      hostname.endsWith(".localhost") ||
      hostname === "127.0.0.1" ||
      hostname === "[::1]" ||
      hostname === "::1" ||
      /^10\./.test(hostname) ||
      /^192\.168\./.test(hostname) ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(hostname)
    );
  } catch {
    return false;
  }
}

/**
 * Production honours CORS_ORIGINS exactly. Development also accepts any local
 * address, because the dev servers are reachable as localhost, 127.0.0.1 and
 * the machine's LAN IP, and listing every one of them is pure friction.
 */
function isAllowedOrigin(origin) {
  if (env.corsOrigins.includes(origin)) return true;
  return !env.isProd && isLocalOrigin(origin);
}

export function createApp() {
  const app = express();

  // Behind a proxy (Render, Railway, nginx) this is what makes req.ip — and so
  // the rate limiters — see the real client address.
  app.set("trust proxy", 1);

  app.use(
    helmet({
      // Uploaded images are rendered by the frontend and admin on other origins.
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );

  app.use(
    cors({
      origin(origin, callback) {
        // Same-origin, curl and server-side fetches send no Origin header.
        if (!origin || isAllowedOrigin(origin)) return callback(null, true);

        // A rejected origin looks exactly like a dead server in the browser, so
        // say what actually happened — here and in the response.
        console.warn(
          `[cors] blocked ${origin} — add it to CORS_ORIGINS in backend/.env ` +
            `(currently: ${env.corsOrigins.join(", ")})`,
        );
        callback(
          new ApiError(
            403,
            `Origin not allowed by CORS: ${origin}. Add it to CORS_ORIGINS in backend/.env.`,
          ),
        );
      },
      credentials: true,
    }),
  );

  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(compression());
  if (!env.isProd) app.use(morgan("dev"));

  app.use("/uploads", express.static(env.uploadsDir, { maxAge: "7d" }));

  app.get("/", (_req, res) =>
    res.json({ success: true, message: "Portfolio API", docs: "/api/health" }),
  );
  app.use("/api", routes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
