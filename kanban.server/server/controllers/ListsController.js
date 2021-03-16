import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
// import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'

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
  }

  async getAll(req, res, next) {
    try {
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
      res.send(await listsService.deleteList(req.params.id))
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
}
