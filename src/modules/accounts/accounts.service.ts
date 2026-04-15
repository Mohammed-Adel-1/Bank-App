import { NextFunction, Request, Response } from "express";
import bankAccountRepository from "../../DB/repositories/bankAccount.repository";
import { AppError } from "../../common/utils/golbal.error.handler";


class accountsService {

  private readonly _accountsModel = new bankAccountRepository();
  constructor() { };


  getAccountData = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.user){
      throw new AppError("User not authorized", 401);
    }

    const account = await this._accountsModel.findOne({filter: {userId: req.user._id}});

    res.status(200).json({ message: "Your account information", account});
  }
}


export default new accountsService;