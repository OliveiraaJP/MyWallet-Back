/* 
  
import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let cachedDb;

const client = new MongoClient(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function connectMongoDB() {
  if (cachedDb) {
    return { database: cachedDb, client };
  }

  await client.connect();

  const database = client.db(process.env.MONGO_DB);
  cachedDb = database;

  return { database, client };
} */