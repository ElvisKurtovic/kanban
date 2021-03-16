import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async createTask(rawTask) {
    try {
      return await dbContext.Task.create(rawTask)
    } catch (error) {
      console.error(error)
    }
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

  async deleteTask(id) {
    try {
      return await dbContext.Task.findByIdAndDelete(id)
    } catch (error) {
      console.error(error)
    }
  }

  // async editTask(id, editedTask) {
  //   try {
  //     return await dbContext.Task.findByIdAndUpdate({ _id: id }, editedTask)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
}

export const tasksService = new TasksService()
