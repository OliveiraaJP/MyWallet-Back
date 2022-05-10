import database from "../database";

export async function getUser (req, res, next){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer", "").trim();

    if (!token) return res.status(401).send("sem token");

    try {
        const session = await database.collection("sessions").findOne({token});
        if(!session) return res.status(401).send("sem sessão");

        const user = await database.collection("users").findOne({_id: session.userId})
        if(!user) return res.status(401).send("sem user");

        res.locals.user = user;
        next()
        
    } catch (error) {
        console.log("user middleware error", error);
        return res.sendStatus(500)
    }
}