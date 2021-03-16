import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async createBoard(rawBoard) {
    try {
      return await dbContext.Board.create(rawBoard)
    } catch (error) {
      console.error(error)
    }
  }

  async find(query = {}) {
    const boards = await dbContext.Board.find(query)
    return boards
  }

  async findById(id) {
    const board = await dbContext.Board.findById(id)
    if (!board) {
      throw new BadRequest('Invalid Id')
    }
    return board
  }

  async deleteBoard(id) {
    try {
      return await dbContext.Board.findByIdAndDelete(id)
    } catch (error) {
      console.error(error)
    }
  }

  async editBoard(id, editedBoard) {
    try {
      return await dbContext.Board.findByIdAndUpdate({ _id: id }, editedBoard)
    } catch (error) {
      console.error(error)
    }
  }
}

export const boardsService = new BoardsService()
