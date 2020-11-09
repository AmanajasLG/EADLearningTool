import { authHeader } from '../_helpers'
import api from './api.services'
import request from './request.services'
import axios from 'axios'

const database = (path) =>  `https://learning-tool-backend.herokuapp.com/${path}`

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
}

function login(email, password) {
    return axios.post('https://learning-tool-backend.herokuapp.com/auth/local', {
        identifier: email,
        password: password
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user',JSON.stringify(user))

            return user
        })
}

function logout(){
    localStorage.removeItem('user')
}

function getAll() {
    // pegar rota
    return axios(
      {
        method: 'get',
        url: database('users'),
        headers: authHeader()
      })
      .then(handleResponse)
}

function getById(id){
    return api.get('/users/id', {
        headers: authHeader()
    }).then(handleResponse)
}

function register(user) {
    return axios.post('https://learning-tool-backend.herokuapp.com/auth/local/register', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(handleResponse)
}

function update(user){
    // checar rota
    return axios.put('https://learning-tool-backend.herokuapp.com/', user, {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    }).then(handleResponse)
}

function _delete(id){
    return axios
    ({
        method: 'delete',
        url: database(`users/${id}`),
        headers: authHeader()
    }).then(handleResponse)
}

function handleResponse(response) {
    console.log(response)

    if(response.status !== 200){
        if(response.status === 401){
            logout()
            window.location.reload()
        }

        return Promise.reject(response.statusText)
    }

    return response.data
}
