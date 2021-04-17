import { userConstants } from '../_constants';

export function users(state = {}, action) {
    switch (action.type) {
        case userConstants.UPDATE_REQUEST:
            return {updating: true}
        case userConstants.UPDATE_SUCCESS:
            return {}
        case userConstants.UPDATE_FAILURE:
            return {}
        case userConstants.GETALL_REQUEST:
            return {...state,
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            return {...state,
                items: action.users
            };
        case userConstants.GETALL_FAILURE:
            return {...state,
                error: action.error
            };
        case userConstants.GETBYID_REQUEST:
            return {...state,
                loading: true
            };
        case userConstants.GETBYID_SUCCESS:
            return {...state,
                items: action.user
            };
        case userConstants.GETBYID_FAILURE:
            return {...state,
                error: action.error
            };
        case userConstants.FIND_REQUEST:
            return {...state,
                loading: true
            };
        case userConstants.FIND_SUCCESS:
            return {...state,
                items: action.user
            };
        case userConstants.FIND_FAILURE:
            return {...state,
                error: action.error
            };
        case userConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case userConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {...state,
                items: state.items.filter(user => user.id !== action.id)
            };
        case userConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = user;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                })
            };
        case userConstants.GETROLES_REQUEST:
            return {...state,
                loading: true
            };
        case userConstants.GETROLES_SUCCESS:
            return {...state,
                roles: action.users.roles
            };
        case userConstants.GETROLES_FAILURE:
            return {...state,
                error: action.error
            };
        default:
            return state
    }
}
