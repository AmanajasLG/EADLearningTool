import { platformConfigConstants } from '../_constants/platformConfig.constants'

export function platformConfig ( state = {gameMode: false}, action ) {
	switch( action.type ) {
		case platformConfigConstants.SET_GAMEMODE:
			return {...state, gameMode: action.gameMode};

		default:
			return state;
	}
}