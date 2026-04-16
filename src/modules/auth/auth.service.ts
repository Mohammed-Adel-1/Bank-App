import { NextFunction, Request, Response } from "express";
import { signInDto, signUpDto } from "./auth.dto";
import { IUser } from "../../DB/models/user.model";
import { HydratedDocument } from "mongoose";
import UserRepository from "../../DB/repositories/user.repository";
import { compare, hash } from "../../common/utils/security/hash";
import { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, SALT_ROUNDS } from "../../config/config.service";
import { AppError } from "../../common/utils/golbal.error.handler";
import { randomUUID } from "crypto";
import { generateToken } from "../../common/utils/token.service";
import bankAccountModel from "../../DB/models/bankAccount.model";
import { bankAccountEnum, currencyEnum } from "../../common/enum/bankAccount.enum";


class AuthService {

  private readonly _userModel = new UserRepository();
  constructor() { };

  signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { fullName, email, password }: signUpDto = req.body;

    if (await this._userModel.findOne({ filter: { email } })) {
      throw new AppError("Email already exists", 409);
    }

    const user: HydratedDocument<IUser> = await this._userModel.create({
      fullName,
      email,
      password: hash({ plainText: password, saltRounds: SALT_ROUNDS }),
    } as Partial<IUser>);

    const account = await bankAccountModel.create({
      userId: user._id,
      accountNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      balance: 0,
      currency: currencyEnum.egp,
      status: bankAccountEnum.active
    })

    if(!user) {
      throw new AppError("Failed to create user account", 409);
    }
    
    if(!account) {
      throw new AppError("Failed to create bank account", 409);
    }

    res.status(201).json({ message: "User signed up successfully"});
  };

  signIn = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: signInDto = req.body;

    const user = await this._userModel.findOne({ filter: { email } });

    if (!user) {
      throw new AppError("Invalid Email", 409);
    };


    if (!compare({ plainText: password, cipherText: user.password })) {
      throw new AppError("Password is not correct", 401);
    }

    const jwtid = randomUUID();

    const access_token = generateToken({
      payload: { id: user._id, email },
      secret_key: ACCESS_SECRET_KEY,
      options: {
        expiresIn: 60 * 5,
        jwtid,
      },
    });

    const refresh_token = generateToken({
      payload: { id: user._id, email },
      secret_key: REFRESH_SECRET_KEY,
      options: {
        expiresIn: "1y",
        jwtid,
      },
    });

    res.status(200).json({ message: "User signedin successfully", data: { access_token, refresh_token } });
  };

}


export default new AuthService;