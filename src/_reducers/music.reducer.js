import { musicConstants } from '../_constants/music.constants'

export function music ( state = {url: '', volume: 15}, action ) {
	console.log('music reducer action: ', action)
	switch( action.type ) {
		case musicConstants.PLAY:
			return {...state, playing: true}
		case musicConstants.PAUSE:
			return {...state, playing: false}
		case musicConstants.SET:
			return {...state, url: action.url, playing: true}
		case musicConstants.VOLUME:
			return {...state, volume: action.volume}
		default:
			return state;
	}
}
