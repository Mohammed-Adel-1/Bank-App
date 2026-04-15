import mongoose, { Model, Types } from "mongoose";
import { roleEnum } from "../../common/enum/user.enum";



export interface IUser {
    _id: Types.ObjectId,
    fullName: string,
    email: string,
    password: string,
    role: string
}



const userSchema = new mongoose.Schema<IUser>({
    fullName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 25
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 3,
        max: 25
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 8,
        max: 25
    },
    role: {
        type: String,
        enum: roleEnum,
        default: roleEnum.user
    }
},{
    timestamps: true,
    strict: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true},
});

const userModel: Model<IUser> = mongoose.models.user || mongoose.model<IUser>("user", userSchema);
export default userModel;