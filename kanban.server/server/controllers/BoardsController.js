import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post('', this.createBoard)
      .delete('/:id', this.deleteBoard)
  }

  async getAll(req, res, next) {
    try {
      res.send(await boardsService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async createBoard(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(201, await boardsService.createBoard(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteBoard(req, res, next) {
    try {
      res.send(await boardsService.deleteBoard(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      res.send(await boardsService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
