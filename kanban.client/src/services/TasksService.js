import { AppState } from '../AppState.js'
import { api } from './AxiosService'

class TasksService {
  async createTask(rawTask) {
    try {
      const res = await api.post('api/lists/' + rawTask.listId + '/tasks', rawTask)
      AppState.tasks[rawTask.listId].push(res.data)
      console.log(rawTask, res.data)
      this.getTasks(rawTask.listId)
      return res.data.id
    } catch (error) {
      console.error(error)
    }
  }

  async getTasks(listId) {
    try {
      const res = await api.get('api/lists/' + listId + '/tasks')
      AppState.tasks[listId] = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async deleteTask(id) {
    try {
      const res = await api.delete('api/tasks/' + id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }
}
export const tasksService = new TasksService()
