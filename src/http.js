import Axios from 'axios'
import qs from 'qs'

export default class Http {
  static get (url, params) {
    return new Promise((resolve, reject) => {
      return Axios.get(url, qs.stringify(params)).then(res => resolve(res)).catch(err => reject(err))
    })
  }
  static post (url, params) {
    return new Promise((resolve, reject) => {
      return Axios.post(url, qs.stringify(params)).then(res => resolve(res)).catch(err => reject(err))
    })
  }
}
