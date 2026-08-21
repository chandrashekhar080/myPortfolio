import { env } from "./config/env.js";
import { connectDb, disconnectDb } from "./config/db.js";
import { createApp } from "./app.js";

async function start() {
  await connectDb();

  const server = createApp().listen(env.port, () => {
    console.log(`[api] listening on ${env.publicUrl} (${env.nodeEnv})`);
    console.log(`[api] allowed origins: ${env.corsOrigins.join(", ")}`);
  });

  const shutdown = async (signal) => {
    console.log(`\n[api] ${signal} received — shutting down`);
    server.close(async () => {
      await disconnectDb();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("unhandledRejection", (reason) => {
    console.error("[api] unhandled rejection:", reason);
  });
}

start().catch((error) => {
  console.error("[api] failed to start:", error.message);
  process.exit(1);
});
