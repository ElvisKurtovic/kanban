import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async createComment(rawComment) {
    try {
      return await dbContext.Comment.create(rawComment)
    } catch (error) {
      console.error(error)
    }
  }

  async find(query = {}) {
    const comments = await dbContext.Comment.find(query)
    return comments
  }

  async findById(id) {
    const comment = await dbContext.Comment.findById(id)
    if (!comment) {
      throw new BadRequest('Invalid Id')
    }
    return comment
  }

  async deleteComment(id, userId) {
    const comment = await dbContext.Comment.findOneAndDelete({ _id: id, creatorId: userId })
    if (!comment) {
      throw new Error('You must be the creator to delete this')
    }
  }

  async editComment(id, editedComment) {
    try {
      return await dbContext.Comment.findByIdAndUpdate({ _id: id }, editedComment)
    } catch (error) {
      console.error(error)
    }
  }
}

export const commentsService = new CommentsService()
