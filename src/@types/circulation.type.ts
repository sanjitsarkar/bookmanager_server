import { EventType } from "../model/circulation.model"

export interface ICheckoutBookParams {
  bookId: number,
  memberId: number,
}
export interface IReturnBookParams {
  bookId: number,
  memberId: number,
}

export interface IReturnBookResponse {
  bookId: number,
  memberID: number,
}

export interface ICirculation {
  book_id: number,
  member_id: number
  eventtype: string,
  date: string
}
export interface IGetBookStatuses {
  memberId: number, bookId: number
}
export interface IRemoveBookStatus {
  memberId: number, bookId: number, eventType: EventType
}