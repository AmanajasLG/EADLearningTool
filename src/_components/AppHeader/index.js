import './index.scss'
import React from 'react'
import UserHeader from '../UserHeader'
import DefaultHeader from '../DefaultHeader'

const AppHeader = ({props}) => {
	return props.isLogged ? <UserHeader pageInfo={props} /> : <DefaultHeader />
}

export default AppHeader