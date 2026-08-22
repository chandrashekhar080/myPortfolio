import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const rootDir = path.resolve(here, "..", "..");

dotenv.config({ path: path.join(rootDir, ".env") });

const nodeEnv = process.env.NODE_ENV ?? "development";
const isProd = nodeEnv === "production";

/** Collected instead of thrown, so startup can report every problem at once. */
const problems = [];

/**
 * Required everywhere. The fallback is a development convenience only — in
 * production a missing value is an error rather than a silent default that
 * points at a machine which isn't there.
 */
function required(name, devFallback) {
  const value = process.env[name] || (isProd ? undefined : devFallback);
  if (!value) {
    problems.push(
      isProd
        ? `${name} is not set — add it in your host's environment settings (Render → your service → Environment).`
        : `${name} is not set — copy .env.example to .env and fill it in.`,
    );
    return "";
  }
  return value;
}

const jwtSecret = required("JWT_SECRET", "dev-only-insecure-secret");

if (isProd && jwtSecret) {
  if (jwtSecret.startsWith("change-me") || jwtSecret === "dev-only-insecure-secret") {
    problems.push("JWT_SECRET is still the placeholder value — set a real secret.");
  } else if (jwtSecret.length < 32) {
    problems.push(
      `JWT_SECRET is only ${jwtSecret.length} characters — use at least 32 (64 hex chars is a good default).`,
    );
  }
}

export const env = {
  port: Number(process.env.PORT ?? 5000),
  nodeEnv,
  isProd,
  mongoUri: required("MONGODB_URI", "mongodb://127.0.0.1:27017/portfolio"),
  jwtSecret,
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

/**
 * Called from the entrypoints rather than run on import: a throw during module
 * evaluation escapes the caller's try/catch and Node prints a stack trace
 * instead of the explanation below.
 */
export function assertEnv() {
  if (!problems.length) return;
  throw new Error(
    `Invalid environment configuration (NODE_ENV=${nodeEnv}):\n` +
      problems.map((problem) => `  - ${problem}`).join("\n") +
      `\nGenerate a secret with: node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`,
  );
}
