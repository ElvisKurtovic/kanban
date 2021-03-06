import { AppState } from '../AppState.js'
import { api } from './AxiosService'

class ListsService {
  async createList(id, rawList) {
    try {
      rawList.boardId = id
      const res = await api.post('api/boards/' + id + '/lists', rawList)
      AppState.lists.push(res.data)
      return res.data.id
    } catch (error) {
      console.error(error)
    }
  }

  async deleteList(id) {
    try {
      await api.delete('api/lists/' + id)
    } catch (error) {
      console.error(error)
    }
  }
}
export const listsService = new ListsService()
