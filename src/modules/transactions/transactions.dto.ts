import { depositOrWithdrawSchema, getOneTransactionSchema, transferSchema } from "./transactions.validation";
import * as z from "zod";



export type getOneTransactionDto = z.infer<typeof getOneTransactionSchema.params>;
export type depositOrWithdrawDto = z.infer<typeof depositOrWithdrawSchema.body>;
export type transferDto = z.infer<typeof transferSchema.body>;