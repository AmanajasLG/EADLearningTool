import { authHeader } from '../_helpers'
import api from './api.services'
// import request from './request.services'
// import axios from 'axios'

// const database = (path) =>  `https://learning-tool-backend.herokuapp.com/${path}`

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
    return api(
        {            
            method: 'post',
            url: '/auth/local',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                identifier: email,
                password: password
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
    return api(
      {
        method: 'get',
        url: '/users',
        headers: authHeader()
      })
      .then(handleResponse)
}

function getById(id){
    return api(
        {
          method: 'get',
          url: `/users/${id}`,
          headers: authHeader()
        })
        .then(handleResponse)
}

function register(user) {
    return api(
        {
          method: 'post',
          url: '/users/',
          headers: {
              ...authHeader(),
            'Content-Type': 'application/json'
            },
          data: user,
        })
        .then(handleResponse)
}

function update(user){
    // checar rota
    return api(
        {
          method: 'put',
          url: `/users/${user.id}`,
          headers:  {
            ...authHeader(),
          'Content-Type': 'application/json'
          },
          data: user
        })
        .then(handleResponse)
}

function _delete(id){
    return api(
        {
          method: 'delete',
          url: `/users/${id}`,
          headers: authHeader()
        })
        .then(handleResponse)
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