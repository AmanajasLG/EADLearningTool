import { headerConstants } from '../_constants'

export function header (state = {state: headerConstants.STATES.NORMAL, title: "", subtitle: ""}, action) {
    switch(action.type) {
        case headerConstants.SET_TITLE:
			return {...state, title: action.newTitle};

		case headerConstants.SET_SUBTITLE:
			return {...state, subtitle: action.newSubtitle};

		case headerConstants.SET_ALL:
			return {...state, title: action.newTitle, subtitle: action.newSubtitle};

		case headerConstants.CLEAR_TITLE:
			return {...state, title: ""};

		case headerConstants.CLEAR_SUBTITLE:
			return {...state, subtitle: ""};

		case headerConstants.CLEAR_ALL:
			return {...state, title: "", subtitle: ""};

		case headerConstants.SET_STATE:
			return {...state, state: action.newState};

		default:
			return state;
    }
}
