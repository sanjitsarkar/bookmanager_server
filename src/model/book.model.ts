import { Schema, model } from "mongoose"
import { IBook } from "../@types/book.type";

const bookSchema = new Schema({
  BookName: {
    type: String,
    required: true,
  },
  BookID: {
    type: Number,
    required: true,
    unique: true
  },
  NumberOfCopies: {
    type: Number,
    required: true,
    default: 0
  }
},
  {
    timestamps: true
  })

export default model<IBook>("book", bookSchema);