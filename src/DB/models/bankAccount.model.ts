import mongoose, { Model, Types } from "mongoose";
import { bankAccountEnum } from "../../common/enum/bankAccount.enum";



export interface IBankAccount {
    _id: Types.ObjectId,
    userId: Types.ObjectId,
    accountNumber: string,
    balance: number,
    currency: string,
    status: string,
}



const bankAccountSchema = new mongoose.Schema<IBankAccount>({
    userId: {
        type: Types.ObjectId,
        required: true,
        unique: true,
        ref: "user"
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    currency:String,
    status: {
        type: String,
        enum: bankAccountEnum,
        default: bankAccountEnum.active
    }
},{
    timestamps: true,
    strict: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true},
});

const bankAccountModel: Model<IBankAccount> = mongoose.models.bankAccount || mongoose.model<IBankAccount>("bankAccount", bankAccountSchema);
export default bankAccountModel;