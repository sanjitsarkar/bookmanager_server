import { IUpdateType } from "../@types/book.type";
import { ICheckoutBookParams, IReturnBookParams } from "../@types/circulation.type";
import { BookRepository } from "../repositories/book.repository";
import { CirculationRepository } from "../repositories/circulation.repository";

class CirculationService {
  constructor(private readonly _circulationRepository: CirculationRepository, private readonly _bookRepository: BookRepository) {

  }
  async returnBook(params: IReturnBookParams) {
    try {
      const book = await this._bookRepository.getBook(params.bookId)

      if (!book) {
        throw new Error("Book is not available")
      }

      const returnInfo = await this._circulationRepository.returnBook(params);
      if (!returnInfo) {
        throw new Error("Error returning book")

      }
      const updatedBook = await this._bookRepository.updateNumberOfCopies({ bookId: params.bookId, updateType: IUpdateType.INCREMENT })
      if (!updatedBook) {
        throw new Error("Error updating number of copies of book")

      }
      return returnInfo;
    }
    catch (err) {
      console.log("err", err)

      throw new Error(err.message)
    }
  }
  async checkoutBook(params: ICheckoutBookParams) {
    try {
      const book = await this._bookRepository.getBook(params.bookId)

      if (!book) {
        throw new Error("Book is not available")
      }
      else if (!book.NumberOfCopies) {
        throw new Error("There is no available copy for checking out")
      }
      const checkoutInfo = await this._circulationRepository.checkoutBook(params);
      if (!checkoutInfo) {
        throw new Error("Error checking out of book")

      }
      const updatedBook = await this._bookRepository.updateNumberOfCopies({ bookId: params.bookId, updateType: IUpdateType.DECREMENT })
      if (!updatedBook) {
        throw new Error("Error updating number of copies of book")

      }
      return checkoutInfo;

    }
    catch (err) {
      console.log("err", err)
      throw new Error("Error checking out of book")
    }
  }
}

export default new CirculationService(new CirculationRepository(), new BookRepository())