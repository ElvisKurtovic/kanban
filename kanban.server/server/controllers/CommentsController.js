import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
// import { boardsService } from '../services/BoardsService'
// import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      // .post('', this.createComment)
      .delete('/:id', this.deleteComment)
      .put('/:id', this.editComment)
  }

  async getAll(req, res, next) {
    try {
      req.query.creatorId = req.userInfo.id
      res.send(await commentsService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  // async createComment(req, res, next) {
  //   try {
  //     // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
  //     req.body.creatorId = req.userInfo.id
  //     res.send(201, await commentsService.createComment(req.body))
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async deleteComment(req, res, next) {
    try {
      res.send(await commentsService.deleteComment(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      res.send(await commentsService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async editComment(req, res, next) {
    try {
      res.send(await commentsService.editComment(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }
}
