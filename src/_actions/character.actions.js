import { characterConstants } from '../_constants'
import { characterService } from '../_services'
import { alertActions } from './'
import { history, requester } from '../_helpers'


function getAll(){
  return requester(characterService.getAll, request, success, failure)

  function request() { return { type: characterConstants.GETALL_REQUEST }}
  function success(characters) { return {type: characterConstants.GETALL_SUCCESS, characters} }
  function failure(error) { return {type: characterConstants.GETALL_FAILURE, error} }
}

function getById(id){
  return requester(characterService.getById, request, success, failure, id)

  function request() { return {type: characterConstants.GETBYID_REQUEST} }
  function success(character) { return {type: characterConstants.GETBYID_SUCCESS, character} }
  function failure(error) { return {type: characterConstants.GETBYID_FAILURE, error} }
}

function count(){
}

function create(character){
  console.log('requester:', requester)
  return requester(characterService.create, request, success, failure, character)

  function request(character) { return {type: characterConstants.CREATE_REQUEST, character} }
  function success(character) { return {type: characterConstants.CREATE_SUCCESS, character} }
  function failure(error) { return {type: characterConstants.CREATE_FAILURE, error} }
}

function update(character){
    return requester(characterService.update, request, success, failure, character)

    function request(character) { return {type: characterConstants.UPDATE_REQUEST, character} }
    function success(character) { return {type: characterConstants.UPDATE_SUCCESS, character} }
    function failure(error) { return {type: characterConstants.UPDATE_FAILURE, error} }
}

function _delete(){
}

export const characterActions = {
    getAll,
    getById,
    count,
    create,
    update,
    delete: _delete
}
