import { ICheckoutBookParams, ICirculation, IGetBookStatuses, IRemoveBookStatus, IReturnBookParams } from "../@types/circulation.type";
import bookModel from "../model/book.model";
import circulationModel, { EventType } from "../model/circulation.model";

export class CirculationRepository {
  _circulationModel = circulationModel;
  async getBookStatuses(params: IGetBookStatuses): Promise<ICirculation[]> {
    const { bookId, memberId } = params
    return await this._circulationModel.find({ member_id: memberId, book_id: bookId })
  }
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
  async removeBookStatus(params: IRemoveBookStatus) {
    const { bookId, memberId, eventType } = params
    return await this._circulationModel.findOneAndDelete({ eventtype: eventType, member_id: memberId, book_id: bookId })

  }
  async getOverDuedBooksWithFine(memberId: number): Promise<any> {
    const currentDate = new Date();
    const nextWeekDate = new Date(currentDate);
    nextWeekDate.setDate(nextWeekDate.getDate() + 7);
    return await this._circulationModel.aggregate([
      {
        $match: {
          member_id: memberId,
          eventtype: EventType.CHECKOUT,
          date: { $gte: nextWeekDate } // Find books that are checked out and not yet returned after 7 days from now
        }
      },
      {
        $lookup: {
          from: bookModel.collection.name,
          localField: "book_id",
          foreignField: "BookID",
          as: "book"
        }
      },
      {
        $unwind: {
          path: "$book",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          book: {
            $mergeObjects: [
              "$book",
              {
                fine: {
                  $multiply: [
                    {
                      $ceil: {
                        $divide: [
                          { $subtract: ["$date", nextWeekDate] },
                          1000 * 60 * 60 * 24 // Convert milliseconds to days
                        ]
                      },
                    },
                    50 // Fine amount per day
                  ]
                }
              }
            ]
          }
        }
      },
      {
        $replaceRoot: { newRoot: "$book" }
      }
    ]);
  }

}