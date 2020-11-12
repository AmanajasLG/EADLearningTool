import { characterConstants } from '../_constants'
import { characterService } from '../_services'
import { alertActions } from './'
import { history } from '../_helpers'

function getAll(){
    return dispatch => {
        dispatch(request())

        const r = characterService.getAll()
            r.then(
                characters => dispatch(success(characters)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return {type: characterConstants.GETALL_REQUEST} }
    function success(characters) { return {type: characterConstants.GETALL_SUCCESS, characters} }
    function failure(error) { return {type: characterConstants.GETALL_FAILURE, error} }
}

function get(){
}

function count(){
}

function create(){
}

function update(){
}

function _delete(){
}

export const characterActions = {
    getAll,
    get,
    count,
    create,
    update,
    delete: _delete
}
