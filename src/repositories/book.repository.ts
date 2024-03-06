import { IBook, IUpdateNumberOfCopiesParams, IUpdateType } from "../@types/book.type";
import bookModel from "../model/book.model";

export class BookRepository {
  _bookModel = bookModel;
  async getBooks(): Promise<IBook[]> {
    return await this._bookModel.find();
  }
  async updateNumberOfCopies(params: IUpdateNumberOfCopiesParams): Promise<IBook> {
    const { bookId, updateType } = params;
    return await this._bookModel.findOneAndUpdate({ bookId }, {
      $set: {
        $inc: updateType === IUpdateType.INCREMENT ? 1 : -1
      }
    });
  }
  async getBook(bookId: number): Promise<IBook> {
    return await this._bookModel.findOne({ BookID: bookId });
  }

}