import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async createBoard(rawBoard) {
    const board = await dbContext.Board.create(rawBoard)
    return board
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

  async deleteBoard(id, userId) {
    const board = await dbContext.Board.findOneAndDelete({ _id: id, creatorId: userId })
    if (!board) {
      throw new Error('You must be the creator to delete this')
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
