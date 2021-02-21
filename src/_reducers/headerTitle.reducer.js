import { headerTitleConstants } from '../_constants'

export function header (state = {title: "", subtitle: ""}, action) {
    switch(action.type) {
        case headerTitleConstants.CHANGE_TITLE:
			return {...state, title: action.newTitle};

		case headerTitleConstants.CHANGE_SUBTITLE:
			return {...state, subtitle: action.newSubtitle};

		case headerTitleConstants.CHANGE_ALL:
			return {...state, title: action.newTitle, subtitle: action.newSubtitle};

		case headerTitleConstants.CLEAR_TITLE:
			return {...state, title: ""};

		case headerTitleConstants.CLEAR_SUBTITLE:
			return {...state, subtitle: ""};

		case headerTitleConstants.CLEAR_SUBTITLE:
			return {...state, title: "", subtitle: ""};
			
		default:
			return state;
    }
}