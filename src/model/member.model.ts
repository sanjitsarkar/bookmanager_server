import { Schema, model } from "mongoose"
import { IMember } from "../@types/member.type";

const memberSchema = new Schema({
  MemberName: {
    type: String,
    required: true,
  },
  MemberID: {
    type: Number,
    required: String,
  }
})

export default model<IMember>("member", memberSchema);