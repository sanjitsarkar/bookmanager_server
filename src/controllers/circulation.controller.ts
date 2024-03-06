import { Request, Response } from "express"
import booksService from "../services/books.service"
import circulationService from "../services/circulation.service";
export const checkoutBook = async (req: Request, res: Response) => {
  const { bookId } = req.body
  const { memberId } = req.params
  const book = await circulationService.checkoutBook({ memberId, bookId: Number(bookId) });
  res.status(201).json(book)
}
export const returnBook = async (req: Request, res: Response) => {
  const { bookId } = req.body
  const { memberId } = req.params
  const book = await circulationService.returnBook({
    memberId, bookId: Number(bookId)
  });
  res.status(201).json(book)
}