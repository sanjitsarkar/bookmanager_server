import { Request, Response } from "express"
import booksService from "../services/books.service"
export const getBooks = async (_req: Request, res: Response) => {
  const books = await booksService.getBooks();
  res.status(200).json(books)
}
export const getOverDueBooksWithFine = async (req: Request, res: Response) => {
  const { memberId } = req.params
  try {
    const books = await booksService.getOverdDueBooksWithFine(Number(memberId));
    res.status(200).json(books)
  }
  catch (err) {
    res.status(400).json(err)
  }
}