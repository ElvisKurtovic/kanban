import mongoose from 'mongoose'

const Schema = mongoose.Schema
const Comment = new Schema({
  creatorId: { type: String, ref: 'Account', required: true },
  taskId: { type: String, ref: 'List', required: true },
  title: { type: String, required: true },
  creatorEmail: { type: String, required: true }

}, { timestamps: true, toJSON: { virtuals: true } })

export default Comment
