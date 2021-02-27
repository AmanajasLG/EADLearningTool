import { headerTitleConstants } from '../_constants'

export function header (state = {isVisible: true, title: "", subtitle: ""}, action) {
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

		case headerTitleConstants.SHOW_HEADER:
			return {...state, isVisible: true};

		case headerTitleConstants.HIDE_HEADER:
			return {...state, isVisible: false};
			
		default:
			return state;
    }
}
