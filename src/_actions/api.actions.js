import { apiConstants } from '../_constants'
import { apiDataService } from '../apiDataTypes'
import { alertActions } from './'
import { history, requester } from '../_helpers'

//Could use some code refactory
const getAllConstructor = (service, apiDataType) => {
  return function(){
    return requester(service.getAll, request, success, failure)

    function request() { return { type: apiConstants.[apiDataType].GETALL_REQUEST }}
    function success(data) { return {type: apiConstants.[apiDataType].GETALL_SUCCESS, data} }
    function failure(error) { return {type: apiConstants.[apiDataType].GETALL_FAILURE, error} }
  }
}

const getByIdConstructor = (service, apiDataType) => {
  return function(id){
    return requester(service.getById, request, success, failure, id)

    function request() { return {type: apiConstants.[apiDataType].GETBYID_REQUEST} }
    function success(data) { return {type: apiConstants.[apiDataType].GETBYID_SUCCESS, data} }
    function failure(error) { return {type: apiConstants.[apiDataType].GETBYID_FAILURE, error} }
  }
}

const createConstructor = (service, apiDataType) => {
  return function(createData){
    return requester(service.create, request, success, failure, createData)

    function request(data) { return {type: apiConstants.[apiDataType].CREATE_REQUEST, [apiDataType]: data} }
    function success(data) { return {type: apiConstants.[apiDataType].CREATE_SUCCESS, data} }
    function failure(error) { return {type: apiConstants.[apiDataType].CREATE_FAILURE, error} }
  }
}

const updateConstructor = (service, apiDataType) => {
  return function(updateData){
      return requester(service.update, request, success, failure, updateData)

      function request(data) { return {type: apiConstants.[apiDataType].UPDATE_REQUEST, [apiDataType]: data} }
      function success(data) { return {type: apiConstants.[apiDataType].UPDATE_SUCCESS, data} }
      function failure(error) { return {type: apiConstants.[apiDataType].UPDATE_FAILURE, error} }
  }
}

const deleteConstructor = (service, apiDataType) => {
  return function(deleteData){
    return requester(service.delete, request, success, failure, deleteData)

    function request(data) { return {type: apiConstants.[apiDataType].DELETE_REQUEST, [apiDataType]: data} }
    function success(data) { return {type: apiConstants.[apiDataType].DELETE_SUCCESS, id: data.id} }
    function failure(error) { return {type: apiConstants.[apiDataType].DELETE_FAILURE, error} }
  }
}

let apiActions = {}
Object.keys(apiConstants).map( apiDataType =>
  apiActions[`${apiDataType}Actions`] = {
    getAll: getAllConstructor(apiDataService[apiDataType], apiDataType),
    getById: getByIdConstructor(apiDataService[apiDataType], apiDataType),
    create: createConstructor(apiDataService[apiDataType], apiDataType),
    update: updateConstructor(apiDataService[apiDataType], apiDataType),
    delete: deleteConstructor(apiDataService[apiDataType], apiDataType)
})

export { apiActions }
