export interface IBook {
  BookName: string
  BookID: number
  NumberOfCopies: number
}

export enum IUpdateType {
  INCREMENT = "increment",
  DECREMENT = "decrement"
}
export interface IUpdateNumberOfCopiesParams {
  bookId: number,
  updateType: IUpdateType
}