
const initialState = {
  items: []
}

export const reducerBuilder = constants => (state = initialState, action) =>
{
  switch (action.type) {
      case constants.CREATE_REQUEST:
          return {...state, creating: true}
      case constants.CREATE_SUCCESS:
          return {...state, creating: false, items: [...state.items, action.data]}
      case constants.CREATE_FAILURE:
          return {}

      case constants.UPDATE_REQUEST:
          return {...state, updating: true}
      case constants.UPDATE_SUCCESS:
          let index = state.items.findIndex( item => item.id === action.data.id )
          let copy = [...state.items.slice(0, index), action.data, ...state.items.slice(index + 1)]
          return {...state, updating: false,
            items: copy
          }
      case constants.UPDATE_FAILURE:
          return {...state, updating: false}

      case constants.GETALL_REQUEST:
          return {...state,
              loading: true
          };
      case constants.GETALL_SUCCESS:
          return {...state,
              loading: false,
              items: action.data
          };
      case constants.GETALL_FAILURE:
          return {...state,
              loading: false,
              error: action.error
          };

      case constants.GETBYID_REQUEST:
          return {...state,
              loading: true
          };
      case constants.GETBYID_SUCCESS:
          return {...state,
              items: [...state.items, action.data]
          };
      case constants.GETBYID_FAILURE:
          return {...state,
              error: action.error
          };

      case constants.DELETE_REQUEST:
          // add 'deleting:true' property to character being deleted
          return {
              ...state,
              items: state.items.map(item =>
                  item.id === action.id
                      ? { ...item, deleting: true }
                      : item
              )
          };
      case constants.DELETE_SUCCESS:
          // remove deleted character from state
          return {...state,
              items: state.items.filter(item => item.id !== action.id)
          }
      case constants.DELETE_FAILURE:
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