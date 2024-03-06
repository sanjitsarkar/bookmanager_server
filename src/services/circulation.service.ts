import { IUpdateType } from "../@types/book.type";
import { ICheckoutBookParams, IReturnBookParams } from "../@types/circulation.type";
import { EventType } from "../model/circulation.model";
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
      const bookStatuses = await this._circulationRepository.getBookStatuses(params)

      if (!bookStatuses) {
        throw new Error("Error fetching book statuses")

      }
      if (bookStatuses.some((status) => status.eventtype === EventType.RETURN)) {
        throw new Error("You have already returned this book")

      }
      if (!bookStatuses.length || bookStatuses.some((status) => status.eventtype !== EventType.CHECKOUT)) {
        throw new Error("You have to checkout first to be able to return this book")
      }
      const returnInfo = await this._circulationRepository.returnBook(params);
      if (!returnInfo) {
        throw new Error("Error returning book")

      }

      const updatedBook = await this._bookRepository.updateNumberOfCopies({ bookId: params.bookId, updateType: IUpdateType.INCREMENT })
      if (!updatedBook) {
        throw new Error("Error updating number of copies of book")

      }
      if (bookStatuses.some((status) => status.eventtype === EventType.CHECKOUT)) {
        const removedbookStatus = await this._circulationRepository.removeBookStatus({
          ...params,
          eventType: EventType.CHECKOUT
        })
        if (!removedbookStatus) {
          throw new Error("Unable to remove cheked out entry")

        }
      }
      return returnInfo
    }
    catch (err) {

      throw new Error(err)
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
      const bookStatuses = await this._circulationRepository.getBookStatuses(params)
      if (!bookStatuses) {
        throw new Error("Error fetching book statuses")

      }
      if (bookStatuses.some((status) => status.eventtype === EventType.CHECKOUT)) {
        throw new Error("You have already checked out this book")

      }
      const checkoutInfo = await this._circulationRepository.checkoutBook(params);
      if (!checkoutInfo) {
        throw new Error("Error checking out of book")

      }
      const updatedBook = await this._bookRepository.updateNumberOfCopies({ bookId: params.bookId, updateType: IUpdateType.DECREMENT })
      if (!updatedBook) {
        throw new Error("Error updating number of copies of book")

      }
      if (bookStatuses.some((status) => status.eventtype === EventType.RETURN)) {

        const removedbookStatus = await this._circulationRepository.removeBookStatus({
          ...params,
          eventType: EventType.RETURN
        })
        if (!removedbookStatus) {
          throw new Error("Unable to remove returned entry")

        }
      }
      return checkoutInfo;

    }
    catch (err) {
      throw new Error(err)
    }
  }
}

export default new CirculationService(new CirculationRepository(), new BookRepository())