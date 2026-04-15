import { Model } from "mongoose";
import bankAccountModel, { IBankAccount } from "../models/bankAccount.model";
import BaseRepository from "./base.repository";




class bankAccountRepository extends BaseRepository<IBankAccount> {

    constructor(protected readonly model: Model<IBankAccount> = bankAccountModel) {
        super(model);
    }


}

export default bankAccountRepository;