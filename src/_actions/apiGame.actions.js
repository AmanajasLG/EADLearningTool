import { gameConstants } from '../_constants'
import { apiGameServices } from '../_services'

function requester(service, request, success, failure, route, payload){
  return dispatch => {
      dispatch(request(payload))

      return service(route, payload)
        .then(
            data => {
              dispatch(success(data))
              return Promise.resolve()
              },
            error => {
                dispatch(failure(error.toString()))

                try {
                  return Promise.reject(error.response.data.data[0].messages[0].message)
                } catch{
                  console.log(error)
                }
            }
          )
  }
}

//Could use some code refactory
const getAllConstructor = (service) => {
  return function(route, ){
    return requester(service.getAll, request, success, failure, route)

    function request() { return { type: gameConstants.GETALL_REQUEST, info: route }}
    function success(data) { return {type: gameConstants.GETALL_SUCCESS, info: route, data} }
    function failure(error) { return {type: gameConstants.GETALL_FAILURE, info: route, error} }
  }
}

const getByIdConstructor = (service) => {
  return function(route, id){
    return requester(service.getById, request, success, failure, route, id)

    function request() { return {type: gameConstants.GETBYID_REQUEST, info: route} }
    function success(data) { return {type: gameConstants.GETBYID_SUCCESS, info: route, data} }
    function failure(error) { return {type: gameConstants.GETBYID_FAILURE, info: route, error} }
  }
}

const findConstructor = (service) => {
  return function(route, findData){
    return requester(service.find, request, success, failure, route, findData)

    function request() { return {type: gameConstants.FIND_REQUEST, info: route} }
    function success(data) { return {type: gameConstants.FIND_SUCCESS, info: route, data} }
    function failure(error) { return {type: gameConstants.FIND_FAILURE, info: route, error} }
  }
}

const createConstructor = (service) => {
  return function(route, createData){
    return requester(service.create, request, success, failure, route, createData)

    function request(data) { return {type: gameConstants.CREATE_REQUEST, info: route, game: data}}
    function success(data) { return {type: gameConstants.CREATE_SUCCESS, info: route, data} }
    function failure(error) { return {type: gameConstants.CREATE_FAILURE, info: route, error} }
  }
}

const updateConstructor = (service) => {
  return function(route, updateData){
      return requester(service.update, request, success, failure, route, updateData)

      function request(data) { return {type: gameConstants.UPDATE_REQUEST, info: route, game: data} }
      function success(data) { return {type: gameConstants.UPDATE_SUCCESS, info: route, data} }
      function failure(error) { return {type: gameConstants.UPDATE_FAILURE, info: route, error} }
  }
}

const deleteConstructor = (service) => {
  return function(route, deleteData){
    return requester(service.delete, request, success, failure, route, deleteData)

    function request(data) { return {type: gameConstants.DELETE_REQUEST, info: route, game: data} }
    function success(data) { return {type: gameConstants.DELETE_SUCCESS, info: route, id: data.id} }
    function failure(error) { return {type: gameConstants.DELETE_FAILURE, info: route, error} }
  }
}

let gameActions = {
  getAll:  getAllConstructor(apiGameServices),
  getById: getByIdConstructor(apiGameServices),
  find: findConstructor(apiGameServices),
  create:  createConstructor(apiGameServices),
  update:  updateConstructor(apiGameServices),
  delete:  deleteConstructor(apiGameServices)
}


export { gameActions }
