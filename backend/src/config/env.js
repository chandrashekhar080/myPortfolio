import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const rootDir = path.resolve(here, "..", "..");

dotenv.config({ path: path.join(rootDir, ".env") });

function required(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === "") {
    throw new Error(`Missing required environment variable: ${name}. Copy .env.example to .env.`);
  }
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 5000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  isProd: (process.env.NODE_ENV ?? "development") === "production",
  mongoUri: required("MONGODB_URI", "mongodb://127.0.0.1:27017/portfolio"),
  jwtSecret: required("JWT_SECRET", "dev-only-insecure-secret"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  corsOrigins: (process.env.CORS_ORIGINS ?? "http://localhost:8080,http://localhost:5174")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  publicUrl: (process.env.PUBLIC_URL ?? `http://localhost:${process.env.PORT ?? 5000}`).replace(
    /\/$/,
    "",
  ),
  uploadsDir: path.join(rootDir, "uploads"),
  admin: {
    email: process.env.ADMIN_EMAIL ?? "admin@example.com",
    password: process.env.ADMIN_PASSWORD ?? "Admin@12345",
    name: process.env.ADMIN_NAME ?? "Site Admin",
  },
};

if (env.isProd && env.jwtSecret.startsWith("change-me")) {
  throw new Error("JWT_SECRET is still the placeholder value — set a real secret in production.");
}
