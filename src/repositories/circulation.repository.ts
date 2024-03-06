import { ICheckoutBookParams, ICirculation, IReturnBookParams } from "../@types/circulation.type";
import bookModel from "../model/book.model";
import circulationModel, { EventType } from "../model/circulation.model";

export class CirculationRepository {
  _circulationModel = circulationModel;

  async checkoutBook(params: ICheckoutBookParams): Promise<ICirculation | null> {
    const { bookId, memberId } = params;
    return await this._circulationModel.create({
      member_id: memberId,
      eventtype: EventType.CHECKOUT,
      book_id: bookId, date: Date.now()
    });
  }
  async returnBook(params: IReturnBookParams): Promise<ICirculation | null> {
    const { bookId, memberId } = params;
    return await this._circulationModel.create({
      member_id: memberId,
      eventtype: EventType.RETURN,
      book_id: bookId, date: Date.now()
    });
  }
  async getOverDuedBooksWithFine(memberId: string): Promise<any> {
    return await this._circulationModel.aggregate([{
      $match: {
        member_id: memberId,
        eventtype: EventType.CHECKOUT,
        date: {
          $gt: new Date().getDate() + 7
        }
      }
    },
    {
      $lookup: {
        localField: "BookID",
        foreignField: "book_id",
        as: "book",
        from: bookModel.collection.name
      }
    }])
  }
}