import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { imagesService } from '../services/ImagesService'
export class ImagesController extends BaseController {
  constructor() {
    super('api/images')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:orientation/', this.getAll)
      .post('/:orientation', this.create)
  }

  async getAll(req, res, next) {
    try {
      const offset = req.query.offset
      return res.send(await imagesService.get(offset, req.query.limit, req.params.orientation))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      req.body.orientation = req.params.orientation
      res.send(await imagesService.create(req.body, req.params.orientation))
    } catch (error) {
      next(error)
    }
  }

  // async createPortrait(req, res, next) {
  //   try {
  //     // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
  //     req.body.creatorId = req.userInfo.id
  //     res.send(await imagesService.createPortrait(req.body))
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
