import mongoose from "mongoose";
import { env } from "./env.js";

mongoose.set("strictQuery", true);

export async function connectDb() {
  try {
    await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 10_000 });
    const { host, name } = mongoose.connection;
    console.log(`[db] connected to ${host}/${name}`);
  } catch (error) {
    console.error("[db] connection failed:", error.message);
    console.error("[db] is MongoDB running? Check MONGODB_URI in backend/.env");
    throw error;
  }
}

export async function disconnectDb() {
  await mongoose.disconnect();
}
