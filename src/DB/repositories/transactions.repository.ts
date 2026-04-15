import { Model } from "mongoose";
import transactionModel, { ITransaction } from "../models/transaction.model";
import BaseRepository from "./base.repository";




class transactionRepository extends BaseRepository<ITransaction> {

    constructor(protected readonly model: Model<ITransaction> = transactionModel) {
        super(model);
    }


}

export default transactionRepository;