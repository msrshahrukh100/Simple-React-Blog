import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

instance.defaults.headers.common['Authorization'] = 'Key from instance'
// axios.defaults.headers.common['Authorization'] = 'Key from instance'
instance.interceptors.request.use(request => {
  console.log(request)
  return request
})


export default instance
