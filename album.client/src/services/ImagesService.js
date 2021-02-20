import { AppState } from '../AppState'
import { api } from './AxiosService'
class ImagesService {
  async get(page) {
    // gets 4 images
    page = Number(page - 1)
    let res = await api.get('/api/images/portrait/?limit=3&offset=' + (page * 6))
    AppState.rightPage = res.data

    res = await api.get('/api/images/landscape/?limit=2&offset=' + (page * 4))
    if (res.data[0]) { AppState.rightPage.push(res.data[0]) }

    if (res.data[1]) { AppState.rightPage.push(res.data[1]) }

    console.log(AppState.rightPage)

    res = await api.get('/api/images/landscape/?limit=2&offset=' + (page * 4 + 2))
    if (res.data[0]) { AppState.leftPage.push(res.data[0]) }

    if (res.data[1]) { AppState.leftPage.push(res.data[1]) }
    res = await api.get('/api/images/portrait/?limit=3&offset=' + (page * 6 + 3))
    AppState.leftPage.push(...res.data)

    console.log(AppState.leftPage)
  }

  create(body, orientation) {
    console.log(orientation)
    api.post(`/api/images/${orientation}`, body)
  }
}

export const imagesService = new ImagesService()
