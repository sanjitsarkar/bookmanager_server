import { BookRepository } from "../repositories/book.repository";
import { CirculationRepository } from "../repositories/circulation.repository";

class BookService {
  constructor(private readonly _bookRepository: BookRepository, private readonly _circularRepository: CirculationRepository) {

  }
  async getBooks() {
    try {
      const books = await this._bookRepository.getBooks()
      if (!books) {
        throw new Error("Error fetching books")

      }
      return books;
    }
    catch (err) {
      throw new Error(err)
    }
  }
  async getOverdDueBooksWithFine(memberId: number) {
    try {
      const books = await this._circularRepository.getOverDuedBooksWithFine(memberId);

      if (!books) {
        throw new Error("Error fetching overdued books")

      }
      return books;


    }
    catch (err) {
      throw new Error(err)

    }
  }
}

export default new BookService(new BookRepository(), new CirculationRepository())