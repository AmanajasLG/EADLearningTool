import axios from 'axios'

const api  = axios.create({
    baseURL: 'https://learning-tool-backend.herokuapp.com'
})

export default api