import { depositOrWithdrawSchema, getOneTransactionSchema } from "./transactions.validation";
import * as z from "zod";



export type getOneTransactionDto = z.infer<typeof getOneTransactionSchema.params>;
export type depositOrWithdrawDto = z.infer<typeof depositOrWithdrawSchema.body>;