import axios from 'axios'

const baseURL = 'https://learning-tool-backend.herokuapp.com'
const api  = axios.create({ baseURL })

export { baseURL }
export default api
