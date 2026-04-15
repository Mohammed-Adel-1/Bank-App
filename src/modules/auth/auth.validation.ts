import * as z from "zod";

export const signUpSchema = {
    body: z.object({
        fullName: z.string().min(9).max(25),
        email: z.email(),
        password: z.string().min(6),
        cPassword: z.string().min(6),
    }).superRefine((data, ctx)=> {
        if(data.password !== data.cPassword){
            ctx.addIssue({
                code: "custom",
                path: ["cPassword"],
                message: "Passwords do not match"
            })
        }
    }),

    
};

export const signInSchema = {
    body: z.object({
        email: z.email(),
        password: z.string().min(6)
    })
};
