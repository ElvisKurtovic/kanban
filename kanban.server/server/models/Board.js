import mongoose from 'mongoose'

const Schema = mongoose.Schema
const Board = new Schema({
  creatorId: { type: String, ref: 'Account', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

export default Board
