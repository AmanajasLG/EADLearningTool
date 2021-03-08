import { musicConstants } from '../_constants/music.constants'

export function music ( state = {url: '', volume: 15}, action ) {
	switch( action.type ) {
		case musicConstants.SET:
			return {...state, url: action.url};
		default:
			return state;
	}
}
