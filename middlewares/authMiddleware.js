import signUpSchema from "../schemas/signUpSchema"

export default async function validSignUp(req, res, next){
    const validation = signUpSchema.validate(req.body, {abortEarly: false})

    if(validation.error){
        return res.status(422).send(validation.error.detailt.map((e) => e.message))
    }
    
    next()
}