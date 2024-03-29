import { Schema, model, Types } from "mongoose"
import { ICirculation } from "../@types/circulation.type";

export enum EventType {
  RETURN = "return",
  CHECKOUT = "checkout"
}
const circulationSchema = new Schema({
  book_id: {
    type: Number,
    required: true
  },
  member_id: {
    type: Number,
    required: true
  },
  eventtype: {
    type: String,
    enum: EventType,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  }
},
  {
    timestamps: true
  })

const circulationModel = model<ICirculation>("circulation", circulationSchema);
circulationModel.createIndexes({ bookId: 1, memberId: 1, eventType: 1 })
export default circulationModel;