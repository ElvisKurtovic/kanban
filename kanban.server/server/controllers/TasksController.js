import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
// import { boardsService } from '../services/BoardsService'
import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .delete('/:id', this.deleteTask)
      .put('/:id', this.editTask)
      // NOTE this is for comments
      .get('/:id/comments', this.getComments)
      .post('/:id/comments', this.createComment)
  }

  async getAll(req, res, next) {
    try {
      req.query.creatorId = req.userInfo.id
      res.send(await tasksService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next) {
    try {
      if (req.body.creatorId === req.userInfo.id) {
        res.send(await tasksService.deleteTask(req.params.id))
      } else {
        res.send('You must be the creator to delete this')
      }
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

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await commentsService.createComment(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      res.send(await commentsService.find({ creatorId: req.userInfo.id, taskId: req.params.id }))
    } catch (error) {
      next(error)
    }
  }
}
