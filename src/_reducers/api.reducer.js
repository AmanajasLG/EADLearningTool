
import { apiCallConstants } from '../_constants'

const initialState = {
  loading: false,
  items: []
}

export function apiCall (state = initialState, action) {
  switch (action.type) {
      case apiCallConstants.CREATE_REQUEST:
          return {...state,
            error: null,
            creating: true
          }
      case apiCallConstants.CREATE_SUCCESS:
          return {...state,
            creating: false,
            items: [...state.items, action.data]
          }
      case apiCallConstants.CREATE_FAILURE:
          return {
            error: action.error
          }

      case apiCallConstants.UPDATE_REQUEST:
          return {...state,
            error: null,
            updating: true
          }
      case apiCallConstants.UPDATE_SUCCESS:
          let index = state.items.findIndex( item => item.id === action.data.id )
          let copy = [...state.items.slice(0, index), action.data, ...state.items.slice(index + 1)]
          return {...state, updating: false,
            items: copy
          }
      case apiCallConstants.UPDATE_FAILURE:
          return {...state, updating: false}

      case apiCallConstants.GETALL_REQUEST:
          return {...state,
              error: null,
              loading: true
          };
      case apiCallConstants.GETALL_SUCCESS:
          return {...state,
              loading: false,
              items: [ ...state.items, action.data ]
          };
      case apiCallConstants.GETALL_FAILURE:
          return {...state,
              loading: false,
              error: action.error
          };

      case apiCallConstants.GETBYID_REQUEST:
          return {...state,
              error: null,
              loading: true
          };
      case apiCallConstants.GETBYID_SUCCESS:
          return {...state,
              items: [...state.items, action.data],
              loading: false
          };
      case apiCallConstants.GETBYID_FAILURE:
          return {...state,
              loading: false,
              error: action.error
          };

        case apiCallConstants.FIND_REQUEST:
            return {...state,
                error: null,
                loading: true
            };
        case apiCallConstants.FIND_SUCCESS:
            return {...state,
                items: [ ...state.items, action.data ],
                loading: false
            };
        case apiCallConstants.FIND_FAILURE:
            return {...state,
                loading: false,
                error: action.error
            };

      case apiCallConstants.DELETE_REQUEST:
          // add 'deleting:true' property to character being deleted
          return {
              ...state,
              items: state.items.map(item =>
                  item.id === action.id
                      ? { ...item, deleting: true }
                      : item
              )
          };
      case apiCallConstants.DELETE_SUCCESS:
          // remove deleted character from state
          return {...state,
              items: state.items.filter(item => item.id !== action.id)
          }
      case apiCallConstants.DELETE_FAILURE:
          // remove 'deleting:true' property and add 'deleteError:[error]' property to character
          return {
              ...state,
              items: state.items.map(item => {
                  if (item.id === action.id) {
                      // make copy of character without 'deleting:true' property
                      const { deleting, ...copy } = item;
                      // return copy of character with 'deleteError:[error]' property
                      return { ...copy, deleteError: action.error };
                  }
                  return item;
              })
          };
      default:
        return state
  }
}
