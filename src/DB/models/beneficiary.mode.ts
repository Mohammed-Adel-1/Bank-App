import mongoose, { Model, Types } from "mongoose";



export interface IBeneficiary {
    _id: Types.ObjectId,
    ownerUserId: Types.ObjectId,
    accountNumber: string,
    bankName: string,
    nickName: string,
}



const beneficiarySchema = new mongoose.Schema<IBeneficiary>({
    ownerUserId: {
        type: Types.ObjectId,
        required: true,
        ref: "user"
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    nickName: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
    strict: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true},
});

const beneficiaryModel: Model<IBeneficiary> = mongoose.models.beneficiary || mongoose.model<IBeneficiary>("beneficiary", beneficiarySchema);
export default beneficiaryModel;