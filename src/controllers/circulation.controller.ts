import { Request, Response } from "express"
import booksService from "../services/books.service"
import circulationService from "../services/circulation.service";
export const checkoutBook = async (req: Request, res: Response) => {
  const { memberId } = req.body
  const { bookId } = req.params
  try {

    const book = await circulationService.checkoutBook({ memberId: Number(memberId), bookId: Number(bookId) });
    res.status(201).json(book)
  }
  catch (err) {
    res.status(400).json({ error: err.message })

  }
}
export const returnBook = async (req: Request, res: Response) => {
  const { memberId } = req.body
  const { bookId } = req.params
  try {

    const book = await circulationService.returnBook({
      memberId: Number(memberId), bookId: Number(bookId)
    });
    res.status(201).json(book)
  }
  catch (err) {

    res.status(400).json({ error: err.message })
  }
}