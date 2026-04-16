import { Router } from "express";
import transactionsService from "./transactions.service";
import authentication from "../../common/middleware/authentication";
import { validation } from "../../common/middleware/validation";
import { depositOrWithdrawSchema, getAllMyTransactionsSchema, getOneTransactionSchema, transferSchema } from "./transactions.validation";


const transactionsRouter = Router();

transactionsRouter.get("/my", validation(getAllMyTransactionsSchema),authentication, transactionsService.getAllMyTransactions);
transactionsRouter.get("/:id", validation(getOneTransactionSchema),authentication, transactionsService.getnOneTransaction);
transactionsRouter.post("/deposit", validation(depositOrWithdrawSchema),authentication, transactionsService.deposit);
transactionsRouter.post("/withdraw", validation(depositOrWithdrawSchema),authentication, transactionsService.withdraw);
transactionsRouter.post("/transfer", validation(transferSchema),authentication, transactionsService.transfer);


export default transactionsRouter;