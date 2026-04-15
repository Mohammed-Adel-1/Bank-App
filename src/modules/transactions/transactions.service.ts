import { NextFunction, Request, Response } from "express";
import { AppError } from "../../common/utils/golbal.error.handler";
import transactionRepository from "../../DB/repositories/transactions.repository";
import bankAccountModel from "../../DB/models/bankAccount.model";
import { depositOrWithdrawDto, getOneTransactionDto } from "./transactions.dto";
import mongoose from "mongoose";
import { transactionEnum, TransactionStatus } from "../../common/enum/transaction.enum";
import { bankAccountEnum } from "../../common/enum/bankAccount.enum";


class transactionsService {

  private readonly _transactionsModel = new transactionRepository();
  constructor() { };

  getAllMyTransactions = async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;

    const skip: number = (page - 1) * limit;


    if (!req.user) {
      throw new AppError("User not authorized", 401);
    }

    const account = await bankAccountModel.findOne({ userId: req.user._id });

    if (!account) {
      throw new AppError("Bank account not found", 404);
    }

    const transactions = await this._transactionsModel.find({
      filter: {
        accountId: account._id
      },
      options: {
        skip,
        limit
      }
    });

    if (transactions.length === 0) {
      throw new AppError("You have no transactions yet", 404);
    }

    res.status(200).json({ message: "Your transactions", transactions });
  };

  getnOneTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("Invalid id", 400);
    }

    if (!req.user) {
      throw new AppError("User not authorized", 401);
    }

    const transaction = await this._transactionsModel.findById(new mongoose.Types.ObjectId(id));

    if (!transaction) {
      throw new AppError("No transaction with this ID", 404);
    }

    res.status(200).json({ message: "Your transaction", transaction });
  };

  deposit = async (req: Request, res: Response, next: NextFunction) => {
    const { number }: depositOrWithdrawDto = req.body;

    if (!req.user) {
      throw new AppError("User not authorized", 401);
    }

    const account = await bankAccountModel.findOne({ userId: req.user._id });

    if (!account) {
      throw new AppError("Bank account not found", 404);
    }

    if (account.status === bankAccountEnum.inactive) {
      throw new AppError("Bank account is inactive", 404);
    }

    let balance = account.balance;
    const balanceAfter = balance += number;

    const transaction = await this._transactionsModel.create({
      accountId: account._id,
      type: transactionEnum.deposit,
      amount: number,
      balanceBefore: account.balance,
      balanceAfter,
      status: TransactionStatus.completed,
      createdAt: new Date()
    });

    await bankAccountModel.findByIdAndUpdate(account._id, { balance: balanceAfter });

    res.status(200).json({ message: "Success Deposit", transaction });
  };

  withdraw = async (req: Request, res: Response, next: NextFunction) => {
    const { number }: depositOrWithdrawDto = req.body;

    if (!req.user) {
      throw new AppError("User not authorized", 401);
    }

    const account = await bankAccountModel.findOne({ userId: req.user._id });

    if (!account) {
      throw new AppError("Bank account not found", 404);
    }

    if (account.status === bankAccountEnum.inactive) {
      throw new AppError("Bank account is inactive", 404);
    }

    if (account.balance < number) {
      throw new AppError("Transaction declined, Not enough balance");
    }

    let balance = account.balance;
    const balanceAfter = balance -= number;

    const transaction = await this._transactionsModel.create({
      accountId: account._id,
      type: transactionEnum.withdraw,
      amount: number,
      balanceBefore: account.balance,
      balanceAfter,
      status: TransactionStatus.completed,
      createdAt: new Date()
    });

    await bankAccountModel.findByIdAndUpdate(account._id, { balance: balanceAfter });

    res.status(200).json({ message: "Success Withdrawal", transaction });
  };
}


export default new transactionsService;