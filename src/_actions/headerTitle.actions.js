import { headerTitleConstants } from '../_constants'

const changeTitle = (title) => {return {type: headerTitleConstants.CHANGE_TITLE, newTitle: title}};
const changeSubtitle = (subtitle) => {return {type: headerTitleConstants.CHANGE_SUBTITLE, newSubtitle: subtitle}};
const changeAll = (title, subtitle) => {return {type: headerTitleConstants.CHANGE_ALL, newTitle: title, newSubtitle: subtitle}};

const clearTitle = () => {return {type: headerTitleConstants.CLEAR_TITLE}};
const clearSubtitle = () => {return {type: headerTitleConstants.CLEAR_SUBTITLE}};
const clearAll = () => {return {type: headerTitleConstants.CLEAR_ALL}};

const showHeader = (isToShow = true) => {return isToShow ? {type: headerTitleConstants.SHOW_HEADER} : {type: headerTitleConstants.HIDE_HEADER}};

export const headerTitleActions = {
	changeTitle,
	changeSubtitle,
	changeAll,
	clearTitle,
	clearSubtitle,
	clearAll,
	showHeader
}