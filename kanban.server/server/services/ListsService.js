import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async createList(rawList) {
    const list = await dbContext.List.create(rawList)
    return list
  }

  async find(query = {}) {
    const lists = await dbContext.List.find(query)
    return lists
  }

  async findById(id) {
    const list = await dbContext.List.findById(id)
    if (!list) {
      throw new BadRequest('Invalid Id')
    }
    return list
  }

  async deleteList(id) {
    try {
      return await dbContext.List.findByIdAndDelete(id)
    } catch (error) {
      console.error(error)
    }
  }

  async editList(id, editedList) {
    try {
      return await dbContext.List.findByIdAndUpdate({ _id: id }, editedList)
    } catch (error) {
      console.error(error)
    }
  }
}

export const listsService = new ListsService()
