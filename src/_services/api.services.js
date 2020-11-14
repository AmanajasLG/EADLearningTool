import axios from 'axios'

const baseURL = 'https://learning-tool-backend.herokuapp.com'
export { baseURL }
const api  = axios.create({ baseURL })

export default api
