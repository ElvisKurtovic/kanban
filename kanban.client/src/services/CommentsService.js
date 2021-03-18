import { AppState } from '../AppState.js'
import { api } from './AxiosService'

class CommentsService {
  async createComment(rawComment) {
    try {
      const res = await api.post('api/tasks/' + rawComment.taskId + '/comments', rawComment)
      AppState.comments[rawComment.taskId].push(res.data)
      console.log(rawComment, res.data)
      this.getComments(rawComment.taskId)
      return res.data.id
    } catch (error) {
      console.error(error)
    }
  }

  async getComments(taskId) {
    try {
      const res = await api.get('api/tasks/' + taskId + '/comments')
      AppState.comments[taskId] = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async deleteComment(id) {
    try {
      const res = await api.delete('api/comments/' + id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }
}
export const commentsService = new CommentsService()
