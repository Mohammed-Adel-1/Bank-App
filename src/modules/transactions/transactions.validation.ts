import mongoose from "mongoose";
import * as z from "zod";
import { bankAccountEnum } from "../../common/enum/bankAccount.enum";


export const getAllMyTransactionsSchema = {
    query: z.object({
        page: z.string().min(1),
        limit: z.string().min(1)
    })
};

export const getOneTransactionSchema = {
    params: z.object({
        id: z.string().refine(
            (val) => mongoose.Types.ObjectId.isValid(val),
            {
                message: "Invalid MongoDB ObjectId",
            }
        ),
    }),
};

export const depositOrWithdrawSchema = {
    body: z.object({
        number: z.number().min(20).max(4000)
    })
};

export const transferSchema = {
    body: z.object({
        number: z.number().min(20).max(4000),
        accountNumber: z.string(),
    })
};
