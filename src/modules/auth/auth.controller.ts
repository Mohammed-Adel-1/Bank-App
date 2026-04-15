import { Router } from "express";
import AuthService from "./auth.service";
import { validation } from "../../common/middleware/validation";
import { signInSchema, signUpSchema } from "./auth.validation";


const authRouter = Router();


authRouter.post("/register", validation(signUpSchema),AuthService.signUp);
authRouter.post("/login", validation(signInSchema),AuthService.signIn);


export default authRouter;