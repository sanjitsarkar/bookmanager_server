import { Request, Response } from "express"
import booksService from "../services/books.service"
export const getBooks = async (_req: Request, res: Response) => {
  const books = await booksService.getBooks();
  res.status(200).json(books)
}
export const getOverDueBooksWithFine = async (req: Request, res: Response) => {
  const { memberId } = req.params
  console.log({ memberId })
  const books = await booksService.getOverdDueBooksWithFine(memberId);
  console.log({ books })
  res.status(200).json(books)
}