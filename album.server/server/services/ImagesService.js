import { dbContext } from '../db/DbContext'

class ImagesService {
  async get(offset, limit, orientation) {
    const images = await dbContext[`Images${orientation}`].find({}).limit(Number(limit)).skip(Number(offset))
    return images
  }

  async create(body, orientation) {
    const image = await dbContext[`Images${orientation}`].create(body)
    return image
  }
}

export const imagesService = new ImagesService()
