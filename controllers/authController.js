import database from "../db.js";
import bcrypt from "bcrypt";
import { stripHtml } from "string-strip-html";
import { v4 } from "uuid";

export async function signUp(req, res) {
	const { password, name, email } = req.body;

	const hashedPassword = bcrypt.hashSync(password, 10);

	try {
		const user = await database.collection("users").findOne({ email });
		if (user) {
			res.status(400).send("Usuário já existe.");
			return;
		}
		await database.collection("users").insertOne({
			name: stripHtml(name).result.trim(),
			email: stripHtml(email).result.trim(),
			password: hashedPassword,
		});
		res.status(200).send("Usuário criado com sucesso!");
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}