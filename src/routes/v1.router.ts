import { Router } from "express";
import bookRouter from "./book.router";

const v1Router = Router()

v1Router.use("/books", bookRouter)
export default v1Router;