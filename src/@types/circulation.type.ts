
export interface ICheckoutBookParams {
  bookId: number,
  memberId: string,
}
export interface IReturnBookParams {
  bookId: number,
  memberId: string,
}

export interface IReturnBookResponse {
  bookId: string,
  memberID: string,
}

export interface ICirculation {
  book_id: string,
  member_id: string
  eventtype: string,
  date: string
}