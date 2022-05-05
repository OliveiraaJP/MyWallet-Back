import express, { json } from "express";
import cors from "cors";
import chalk from "chalk"

const app = express();
app.use(json());
app.use(cors());

app.listen(5000, () => {
  console.log(
    chalk.magentaBright.bold("Server is running on: http://localhost:5000")
  );
});
