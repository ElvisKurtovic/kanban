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

  async deleteBoard(id) {
    try {
      await api.delete('api/boards/' + id)
    } catch (error) {
      console.error(error)
    }
  }

  async createBoard(rawBoard) {
    try {
      await api.post('api/boards', rawBoard)
      this.getBoards()
    } catch (error) {
      console.error(error)
    }
  }
}
export const boardsService = new BoardsService()
