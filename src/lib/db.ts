import mongoose from "mongoose";

import dns from "dns/promises";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongodbUrl = process.env.MONGODB_URL;

if (!mongodbUrl) {
  throw new Error("Please define the MONGODB_URL");
}

interface MongooseCache {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDb = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongodbUrl);
  }

  try {
    cached.conn = await cached.promise;

    console.log("MongoDB Connected");

    return cached.conn;
  } catch (error) {
    cached.promise = null;

    console.log("MongoDB Connection Error:", error);

    throw error;
  }
};

export default connectDb;