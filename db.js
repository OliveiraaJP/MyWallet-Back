import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

let database = null;
const mongoClient = new MongoClient(process.env.MONGO_URI); // criando config da conexão
const promise = mongoClient.connect();
promise.then(() => {
  database = mongoClient.db(process.env.DATABASE);
  console.log(chalk.bold.blue("Connected Database"));
});
promise.catch((e) => console.log(chalk.bold.red("Connection Lost"), e));

export default database;