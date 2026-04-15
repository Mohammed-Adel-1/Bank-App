import mongoose, { Model, Types } from "mongoose";
import { transactionEnum, TransactionStatus } from "../../common/enum/transaction.enum";



export interface ITransaction {
    _id: Types.ObjectId,
    accountId: Types.ObjectId,
    type: string,
    amount: number,
    balanceBefore: number,
    balanceAfter: number,
    status: string,
    createdAt: Date
}



const transactionSchema = new mongoose.Schema<ITransaction>({
    accountId: {
        type: Types.ObjectId,
        required: true,
        ref: "bankAccount"
    },
    type: {
        type: String,
        required: true,
        enum: transactionEnum
    },
    amount: {
        type: Number,
        required: true,
    },
    balanceBefore: {
        type: Number,
        required: true,
    },
    balanceAfter: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: TransactionStatus,
        default: TransactionStatus.pending
    },
    createdAt: Date
},{
    timestamps: true,
    strict: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true},
});

const transactionModel: Model<ITransaction> = mongoose.models.transaction || mongoose.model<ITransaction>("transaction", transactionSchema);
export default transactionModel;