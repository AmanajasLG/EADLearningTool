import axios from 'axios'

const api  = axios.create({
    baseUrl: 'https://learning-tool-backend.herokuapp.com'
})

export default api