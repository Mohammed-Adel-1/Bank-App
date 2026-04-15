import * as z from "zod";
import { signInSchema, signUpSchema } from "./auth.validation";

export type signUpDto = z.infer<typeof signUpSchema.body>;
export type signInDto = z.infer<typeof signInSchema.body>;
