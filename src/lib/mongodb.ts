import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

declare global {
  var _mongoClient: MongoClient | undefined;
}

// Reuse one client across hot reloads in dev
const client = globalThis._mongoClient ?? new MongoClient(uri);
if (process.env.NODE_ENV !== "production") globalThis._mongoClient = client;

export const db = client.db();
export { client };
