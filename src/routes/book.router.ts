import { Router } from "express";
import { getBooks, getOverDueBooksWithFine } from "../controllers/book.controller";
import circulationRouter from "./circulation.router";

const bookRouter = Router()

bookRouter.get("/", getBooks)
bookRouter.get("/overdued/:memberId", getOverDueBooksWithFine)
bookRouter.use("/", circulationRouter)
export default bookRouter