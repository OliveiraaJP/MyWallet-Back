import {Router} from "express"
import {SignUp} from "../controllers/authController.js"

import validSignUp from "../middlewares/authMiddleware.js"

const authRouter = Router()

authRouter.post("/signup", validSignUp, SignUp)