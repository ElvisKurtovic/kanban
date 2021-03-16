import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
// import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'

export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post('', this.createList)
      .delete('/:id', this.deleteList)
      .put('/:id', this.editList)
      // NOTE this is for tasks
      .get('/:id/tasks', this.getTasks)
      .post('/:id/tasks', this.createTask)
  }

  async getAll(req, res, next) {
    try {
      req.query.creatorId = req.userInfo.id
      res.send(await listsService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async createList(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(201, await listsService.createList(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteList(req, res, next) {
    try {
      if (req.body.creatorId === req.userInfo.id) {
        res.send(await listsService.deleteList(req.params.id))
      } else {
        res.send('You must be the creator to delete this')
      }
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      res.send(await listsService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async editList(req, res, next) {
    try {
      res.send(await listsService.editList(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await tasksService.createTask(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getTasks(req, res, next) {
    try {
      res.send(await tasksService.find({ creatorId: req.userInfo.id, listId: req.params.id }))
    } catch (error) {
      next(error)
    }
  }
}
