import { userConstants } from '../_constants'
import { userService } from '../_services'
import { alertActions } from './'

export const userActions = {
    getAll,
    getById,
    delete: _delete
}

export const login = (email, password) => dispatch => {
    dispatch(request({email}))

    return userService.login(email, password)
        .then(
            user => {
                dispatch(success(user))
                return Promise.resolve()
            },
            error => {
                dispatch(failure(error.toString()))
                dispatch(alertActions.error(error.toString()))
                return Promise.reject()
            }
        )

    function request(user) { return {type: userConstants.LOGIN_REQUEST, user} }
    function success(user) { return {type: userConstants.LOGIN_SUCCESS, user} }
    function failure(error) { return {type: userConstants.LOGIN_FAILURE, error} }
}

export const logout = () => dispatch => {
    userService.logout()
    dispatch({type: userConstants.LOGOUT})                        
}

export const register = (user) => dispatch => {
    dispatch(request(user))

    return userService.register(user)
        .then(
            user => {
                dispatch(success())
                return Promise.resolve()
            },
            error => {
                dispatch(failure(error.toString()))
                dispatch(alertActions.error(error.toString()))
                console.log(error)
                return Promise.reject()
            }
        )
    function request(user) { return {type: userConstants.REGISTER_REQUEST, user} }
    function success(user) { return {type: userConstants.REGISTER_SUCCESS, user} }
    function failure(error) { return {type: userConstants.REGISTER_FAILURE, error} }
}

export const update = (user) => dispatch => {
    dispatch(request(user))

    return userService.update(user)
        .then(
            user => {
                dispatch(success())
                return Promise.resolve()
            },
            error => {
                dispatch(failure(error.toString()))
                dispatch(alertActions.error(error.toString()))
                return Promise.reject()
            }
        )

    function request(user) { return {type: userConstants.UPDATE_REQUEST, user} }
    function success(user) { return {type: userConstants.UPDATE_SUCCESS, user} }
    function failure(error) { return {type: userConstants.UPDATE_FAILURE, error} }
}

function getAll(){
    return dispatch => {
        dispatch(request())

        const r = userService.getAll()
            r.then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return {type: userConstants.GETALL_REQUEST} }
    function success(users) { return {type: userConstants.GETALL_SUCCESS, users} }
    function failure(error) { return {type: userConstants.GETALL_FAILURE, error} }
}

function getById(id){
    return dispatch => {
        dispatch(request())

        userService.getById(id)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return {type: userConstants.GETBYID_REQUEST} }
    function success(user) { return {type: userConstants.GETBYID_SUCCESS, user} }
    function failure(error) { return {type: userConstants.GETBYID_FAILURE, error} }
}

function _delete(id){
    return dispatch => {
        dispatch(request(id))

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            )
    }

    function request(id) { return {type: userConstants.DELETE_REQUEST, id} }
    function success(id) { return {type: userConstants.DELETE_SUCCESS, id} }
    function failure(id, error) { return {type: userConstants.DELETE_FAILURE, id, error} }
}
