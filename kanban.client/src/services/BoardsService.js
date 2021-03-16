import { AppState } from '../AppState.js'
import { api } from './AxiosService'

class BoardsService {
  async getLists(id) {
    try {
      const res = await api.get('api/boards/' + id + '/lists')
      AppState.lists = res.data
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  async getBoards() {
    try {
      const res = await api.get('api/boards')
      AppState.boards = res.data
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  async getBoard(id) {
    try {
      const res = await api.get('api/boards/' + id)
      AppState.activeBoard = res.data
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  async createBlog(rawBlog) {
    try {
      const res = await api.post('api/blogs', rawBlog)
      AppState.blogs.push(res.data)
      return res.data._id
    } catch (error) {
      console.error(error)
    }
  }

  async createComment(rawComment) {
    try {
      const res = await api.post('/api/comments', rawComment)
      AppState.comments.push(res.data)
      return res.data_id
    } catch (error) {
      console.error(error)
    }
  }

  async deleteBoard(id) {
    try {
      await api.delete('api/boards/' + id)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteComment(commentid, blogId) {
    try {
      await api.delete('api/comments/' + commentid)
      this.getComments(blogId)
    } catch (error) {
      console.error(error)
    }
  }

  async editBlog(id, blog) {
    try {
      await api.put('api/blogs/' + id, blog)
    } catch (error) {
      console.error(error)
    }
  }
}
export const boardsService = new BoardsService()
