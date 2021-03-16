import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
// import { boardsService } from '../services/BoardsService'
import { tasksService } from '../services/TasksService'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post('', this.createTask)
      .delete('/:id', this.deleteTask)
      .put('/:id', this.editTask)
  }

  async getAll(req, res, next) {
    try {
      res.send(await tasksService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(201, await tasksService.createTask(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next) {
    try {
      res.send(await tasksService.deleteTask(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      res.send(await tasksService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async editTask(req, res, next) {
    try {
      res.send(await tasksService.editTask(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }
}
