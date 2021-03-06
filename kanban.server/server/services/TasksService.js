import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async createTask(rawTask) {
    const task = await dbContext.Task.create(rawTask)
    return task
  }

  async find(query = {}) {
    const tasks = await dbContext.Task.find(query)
    return tasks
  }

  async findById(id) {
    const task = await dbContext.Task.findById(id)
    if (!task) {
      throw new BadRequest('Invalid Id')
    }
    return task
  }

  async deleteTask(id, userId) {
    const task = await dbContext.Task.findOneAndDelete({ _id: id, creatorId: userId })
    if (!task) {
      throw new Error('You must be the creator to delete this')
    }
  }

  async editTask(id, editedTask) {
    try {
      return await dbContext.Task.findByIdAndUpdate({ _id: id }, editedTask)
    } catch (error) {
      console.error(error)
    }
  }
}

export const tasksService = new TasksService()
