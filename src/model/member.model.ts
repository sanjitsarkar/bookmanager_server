import { Schema, model } from "mongoose"

const memberSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: String,
  }
})

export default model("member", memberSchema);