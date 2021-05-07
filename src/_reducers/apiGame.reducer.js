import { gameConstants } from '../_constants'

const initialState = {
  loading: false,
  items: []
}

export function game (state = initialState, action) {
  switch (action.type) {
      case gameConstants.CREATE_REQUEST:
          return {...state,
            error: null,
            creating: true
          }
      case gameConstants.CREATE_SUCCESS:
          return {...state,
            creating: false,
            items: {...state.items, ...action.data }
          }
      case gameConstants.CREATE_FAILURE:
          return {
            error: action.error
          }

      case gameConstants.UPDATE_REQUEST:
          return {...state,
            error: null,
            updating: true
          }
      case gameConstants.UPDATE_SUCCESS:
          let index = state.items.findIndex( item => item.id === action.data.id )
          let copy = [...state.items.slice(0, index), action.data, ...state.items.slice(index + 1)]
          return {...state, updating: false,
            items: copy
          }
      case gameConstants.UPDATE_FAILURE:
          return {...state, updating: false}

      case gameConstants.GETALL_REQUEST:
          return {...state,
              error: null,
              loading: true
          };
      case gameConstants.GETALL_SUCCESS:
          return {...state,
              loading: false,
              items: {...state.items, ...action.data }
          };
      case gameConstants.GETALL_FAILURE:
          return {...state,
              loading: false,
              error: action.error
          };

      case gameConstants.GETBYID_REQUEST:
          return {...state,
              error: null,
              loading: true
          };
      case gameConstants.GETBYID_SUCCESS:
          return {...state,
              items: {...state.items, ...action.data },
              loading: false
          };
      case gameConstants.GETBYID_FAILURE:
          return {...state,
              loading: false,
              error: action.error
          };

        case gameConstants.FIND_REQUEST:
            return {...state,
                error: null,
                loading: true
            };
        case gameConstants.FIND_SUCCESS:
            return {...state,
                items:{...state.items, ...action.data },
                loading: false
            };
        case gameConstants.FIND_FAILURE:
            return {...state,
                loading: false,
                error: action.error
            };

      case gameConstants.DELETE_REQUEST:
          // add 'deleting:true' property to character being deleted
          return {
              ...state,
              items: state.items.map(item =>
                  item.id === action.id
                      ? { ...item, deleting: true }
                      : item
              )
          };
      case gameConstants.DELETE_SUCCESS:
          // remove deleted character from state
          return {...state,
              items: state.items.filter(item => item.id !== action.id)
          }
      case gameConstants.DELETE_FAILURE:
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
