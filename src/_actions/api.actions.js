import { apiCallConstants } from '../_constants'
import { ApiServices } from '../_services'


const CallerBuilder = (route) => {

  function requester(service, request, success, failure, payload){
    return dispatch => {
      dispatch(request(payload))

      return service(payload)
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
    return function(){
      return requester(service.getAll, request, success, failure)
  
      function request() { return { type: apiCallConstants.GETALL_REQUEST }}
      function success(data) { return {type: apiCallConstants.GETALL_SUCCESS, data} }
      function failure(error) { return {type: apiCallConstants.GETALL_FAILURE, error} }
    }
  }
      
  const getByIdConstructor = (service) => {
    return function(id){
      return requester(service.getById, request, success, failure, id)
  
      function request() { return {type: apiCallConstants.GETBYID_REQUEST} }
      function success(data) { return {type: apiCallConstants.GETBYID_SUCCESS, data} }
      function failure(error) { return {type: apiCallConstants.GETBYID_FAILURE, error} }
    }
  }
  
  const findConstructor = (service) => {
    return function(findData){
      return requester(service.find, request, success, failure, findData)
  
      function request() { return {type: apiCallConstants.FIND_REQUEST} }
      function success(data) { return {type: apiCallConstants.FIND_SUCCESS, data} }
      function failure(error) { return {type: apiCallConstants.FIND_FAILURE, error} }
    }
  }
  
  const createConstructor = (service) => {
    return function(createData){
      return requester(service.create, request, success, failure, createData)
  
      function request(data) { return {type: apiCallConstants.CREATE_REQUEST, [route.name]: data}}
      function success(data) { return {type: apiCallConstants.CREATE_SUCCESS, data} }
      function failure(error) { return {type: apiCallConstants.CREATE_FAILURE, error} }
    }
  }
  
  const updateConstructor = (service) => {
    return function(updateData){
      return requester(service.update, request, success, failure, updateData)

      function request(data) { return {type: apiCallConstants.UPDATE_REQUEST, [route.name]: data} }
      function success(data) { return {type: apiCallConstants.UPDATE_SUCCESS, data} }
      function failure(error) { return {type: apiCallConstants.UPDATE_FAILURE, error} }
    }
  }
  
  const deleteConstructor = (service) => {
    return function(deleteData){
      return requester(service.delete, request, success, failure, deleteData)
  
      function request(data) { return {type: apiCallConstants.DELETE_REQUEST, [route.name]: data} }
      function success(data) { return {type: apiCallConstants.DELETE_SUCCESS, id: data.id} }
      function failure(error) { return {type: apiCallConstants.DELETE_FAILURE, error} }
    }
  }
  
  const apiServices = ApiServices(route)
  return {
      getAll:  getAllConstructor(apiServices),
      getById: getByIdConstructor(apiServices),
      find: findConstructor(apiServices),
      create:  createConstructor(apiServices),
      update:  updateConstructor(apiServices),
      delete:  deleteConstructor(apiServices)
    }
      
}

export { CallerBuilder }
