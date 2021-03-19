import { headerConstants } from '../_constants'

const setTitle = (title) => {return {type: headerConstants.SET_TITLE, newTitle: title}};
const setSubtitle = (subtitle) => {return {type: headerConstants.SET_SUBTITLE, newSubtitle: subtitle}};
const setAll = (title, subtitle) => {return {type: headerConstants.SET_ALL, newTitle: title, newSubtitle: subtitle}};

const clearTitle = () => {return {type: headerConstants.CLEAR_TITLE}};
const clearSubtitle = () => {return {type: headerConstants.CLEAR_SUBTITLE}};
const clearAll = () => {return {type: headerConstants.CLEAR_ALL}};

const setState = (state) => {return {type: headerConstants.SET_STATE, newState: state}};

export const headerActions = {
	setTitle,
	setSubtitle,
	setAll,
	clearTitle,
	clearSubtitle,
	clearAll,
	setState
}