import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import Joi from "joi";

/* import authRouter from "./routes/authRouter.js"
import transactionRouter from "./routes/transactionsRouter.js" */
/* app.use(authRouter);
app.use(transactionRouter); */

const app = express();
dotenv.config();
app.use(json());
app.use(cors());

let database = null;
const mongoClient = new MongoClient(process.env.MONGO_URI); // criando config da conexão
const promise = mongoClient.connect();
promise.then(() => {
  database = mongoClient.db(process.env.DATABASE);
  console.log(chalk.bold.blue("Connected Database"));
});
promise.catch((e) => console.log(chalk.bold.red("Connection Lost"), e));

app.post("/signup", async (req, res) => {
  {
    const { password, name, email } = req.body;

    const signUpSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.ref("password"),
    });

    const validation = signUpSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      return res.status(422).send(validation.error.mao((e) => e.message));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      const user = await database.collection("users").findOne({ email });
      if (user) {
        res.status(400).send("Usuário já existe.");
        return;
      }
      await database.collection("users").insertOne({
        name,
        email,
        password: hashedPassword,
      });

      res.status(200).send("Usuário criado com sucesso!");
    } catch (error) {
      console.log("Erro criação de User");
      console.log(error);
      res.sendStatus(500);
    }
  }
});

app.post("/signin", async (req, res) => {
  const { password, email } = req.body;

  const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const validation = signInSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res.status(422).send(validation.error.mao((e) => e.message));
  }

  try {
    const user = await database.collection("users").findOne({ email });
    if (!user) {
      return res.status(401).send("Usuario nao encontrado");
    }

    if (user && bcrypt.compare(password, user.password)) {
      const token = v4();
      await database.collection("sessions").insertOne({
        userId: user._id,
        token,
      });
      return res.send({token, name: user.name})
    }
  } catch (error) {
    console.log("errro post signin", error);
    res.sendStatus(500);
  }
});

app.listen(5000, () => {
  console.log(
    chalk.magentaBright.bold(`Server is running on: http://localhost:${5000}`)
  );
});
