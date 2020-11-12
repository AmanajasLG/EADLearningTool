import { characterConstants } from '../_constants';

export function characters(state = {}, action) {
    switch (action.type) {
        case characterConstants.CREATE_REQUEST:
            return {creating: true}
        case characterConstants.CREATE_SUCCESS:
            return {}
        case characterConstants.CREATE_FAILURE:
            return {}

        case characterConstants.UPDATE_REQUEST:
            return {updating: true}
        case characterConstants.UPDATE_SUCCESS:
            return {}
        case characterConstants.UPDATE_FAILURE:
            return {}

        case characterConstants.GETALL_REQUEST:
            return {...state,
                loading: true
            };
        case characterConstants.GETALL_SUCCESS:
            return {...state,
                items: action.characters
            };
        case characterConstants.GETALL_FAILURE:
            return {...state,
                error: action.error
            };

        case characterConstants.GETBYID_REQUEST:
            return {...state,
                loading: true
            };
        case characterConstants.GETBYID_SUCCESS:
            return {...state,
                items: action.character
            };
        case characterConstants.GETBYID_FAILURE:
            return {...state,
                error: action.error
            };

        case characterConstants.DELETE_REQUEST:
            // add 'deleting:true' property to character being deleted
            return {
                ...state,
                items: state.items.map(character =>
                    character.id === action.id
                        ? { ...character, deleting: true }
                        : character
                )
            };
        case characterConstants.DELETE_SUCCESS:
            // remove deleted character from state
            return {...state,
                items: state.items.filter(character => character.id !== action.id)
            };
        case characterConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to character
            return {
                ...state,
                items: state.items.map(character => {
                    if (character.id === action.id) {
                        // make copy of character without 'deleting:true' property
                        const { deleting, ...characterCopy } = character;
                        // return copy of character with 'deleteError:[error]' property
                        return { ...characterCopy, deleteError: action.error };
                    }

                    return character;
                })
            };
        default:
            return state
    }
}
