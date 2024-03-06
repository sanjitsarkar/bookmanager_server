import { Router } from "express";
import { checkoutBook, returnBook } from "../controllers/circulation.controller";

const circulationRouter = Router()

circulationRouter.post("/:bookId/checkout", checkoutBook)
circulationRouter.post("/:bookId/return", returnBook)

export default circulationRouter;