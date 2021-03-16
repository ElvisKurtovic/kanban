import mongoose from 'mongoose'

const Schema = mongoose.Schema
const Task = new Schema({
  creatorId: { type: String, ref: 'Account', required: true },
  listId: { type: String, ref: 'List', required: true },
  title: { type: String, required: true }

}, { timestamps: true, toJSON: { virtuals: true } })

export default Task
