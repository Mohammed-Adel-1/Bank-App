import { Router } from "express";
import accountsService from "./accounts.service";
import authentication from "../../common/middleware/authentication";


const accountsRouter = Router();

accountsRouter.get("/me", authentication, accountsService.getAccountData)


export default accountsRouter;