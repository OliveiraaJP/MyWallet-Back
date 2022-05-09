import express, { json } from "express";
import cors from "cors";
import chalk from "chalk"
import Joi from "joi";

import authRouter from "./routes/authRouter"
import transactionRouter from "./routes/transactionsRouter"

const app = express();
app.use(json());
app.use(cors());

app.use(authRouter);
app.use(transactionRouter);


app.post("/signup", (req, res) => {
  const cadastro = req.body;
})

app.listen(5000, () => {
  console.log(
    chalk.magentaBright.bold("Server is running on: http://localhost:5000")
  ); 
});
