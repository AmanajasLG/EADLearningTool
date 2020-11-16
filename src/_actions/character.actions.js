import { apiConstants } from '../_constants'
import { characterService } from '../_services'
import { alertActions } from './'
import { history, requester } from '../_helpers'

function getAll(){
  return requester(characterService.getAll, request, success, failure)

  function request() { return { type: apiConstants.character.GETALL_REQUEST }}
  function success(characters) { return {type: apiConstants.character.GETALL_SUCCESS, data: characters} }
  function failure(error) { return {type: apiConstants.character.GETALL_FAILURE, error} }
}

function getById(id){
  return requester(characterService.getById, request, success, failure, id)

  function request() { return {type: apiConstants.character.GETBYID_REQUEST} }
  function success(character) { return {type: apiConstants.character.GETBYID_SUCCESS, data: character} }
  function failure(error) { return {type: apiConstants.character.GETBYID_FAILURE, error} }
}

function count(){
}

function create(character){
  return requester(characterService.create, request, success, failure, character)

  function request(character) { return {type: apiConstants.character.CREATE_REQUEST, character} }
  function success(character) { return {type: apiConstants.character.CREATE_SUCCESS, data: character} }
  function failure(error) { return {type: apiConstants.character.CREATE_FAILURE, error} }
}

function update(character){
    return requester(characterService.update, request, success, failure, character)

    function request(character) { return {type: apiConstants.character.UPDATE_REQUEST, character} }
    function success(character) { return {type: apiConstants.character.UPDATE_SUCCESS, character} }
    function failure(error) { return {type: apiConstants.character.UPDATE_FAILURE, error} }
}

function _delete(character){
  return requester(characterService.delete, request, success, failure, character)

  function request(character) { return {type: apiConstants.character.DELETE_REQUEST, character} }
  function success(character) { return {type: apiConstants.character.DELETE_SUCCESS, id: character.id} }
  function failure(error) { return {type: apiConstants.character.DELETE_FAILURE, error} }
}

export const characterActions = {
    getAll,
    getById,
    count,
    create,
    update,
    delete: _delete
}
