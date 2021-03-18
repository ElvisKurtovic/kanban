import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'

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
      .put('/:id', this.editBoard)
      // NOTE these are calling the lists service
      .get('/:id/lists', this.getLists)
      .post('/:id/lists', this.createList)
  }

  async getAll(req, res, next) {
    try {
      req.query.creatorId = req.userInfo.id
      res.send(await boardsService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async createBoard(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const board = await boardsService.createBoard(req.body)
      res.status(201).send(board)
    } catch (error) {
      next(error)
    }
  }

  async deleteBoard(req, res, next) {
    try {
      if (req.body.creatorId === req.userInfo.id) {
        res.send(await boardsService.deleteBoard(req.params.id))
      } else {
        res.send('You must be the creator to delete this')
      }
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      req.query.creatorId = req.userInfo.id
      res.send(await boardsService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async editBoard(req, res, next) {
    try {
      res.send(await boardsService.editBoard(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async getLists(req, res, next) {
    try {
      res.send(await listsService.find({ creatorId: req.userInfo.id, boardId: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async createList(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await listsService.createList(req.body))
    } catch (error) {
      next(error)
    }
  }
}
