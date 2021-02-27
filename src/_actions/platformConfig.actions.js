import { platformConfigConstants } from '../_constants'

const setGameMode = (setGameMode) => {return {type: platformConfigConstants.SET_GAMEMODE, gameMode: setGameMode}};

export const platformConfigActions = {
	setGameMode
}