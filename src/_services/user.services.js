import { authHeader } from '../_helpers'
import api from './api.services'

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    find,
    update,
    delete: _delete,
    getRoles
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
        .then(response => {
          if(response.data.jwt){
            localStorage.setItem('user',JSON.stringify(response.data))
          }
            
          return response.data
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

function find(data) {
  return api(
    {
      method: 'get',
      url: '/users',
      headers: authHeader(),
      query: data
    })
    .then(handleResponse)
}

function register(user) {
    return api(
        {
          method: 'post',
          url: '/auth/local/register',
          headers: {
            'Content-Type': 'application/json'
            },
          data: user,
        })
        .then(response => {
          if(response.data.jwt){
            localStorage.setItem('user',JSON.stringify(response.data))
          }
            
          return response.data
        })
}

function update(user){
    // checar rotausers
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
        .then(response => {
          console.log(response)
        })
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

function getRoles(){
  return api(
    {
      method: 'get',
      url: '/users-permissions/roles',
      headers: authHeader()
    })
    .then(handleResponse)
}

function handleResponse(response) {

  if(response.status !== 200){
      if(response.status === 401){
          logout()
          window.location.reload()
      }

      return Promise.reject(response.statusText)
  }

  return response.data
}

