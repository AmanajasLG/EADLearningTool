import React from 'react'
import { useDispatch } from 'react-redux'
import Phone from './pages/Game1/components/Phone'
import { headerActions } from './_actions'
import { headerConstants } from './_constants'

const TestPage = () => {
	const dispatch = useDispatch()
	React.useEffect( () => {
		dispatch(headerActions.setState(headerConstants.STATES.HIDDEN))
		return () => {dispatch(headerActions.setState(headerConstants.STATES.NORMAL))}
	}, [dispatch] )
	
	// -------------------------------------------
	// MODIFICAR SOMENTE DAQUI PARA BAIXO
	// -------------------------------------------

	const [contacts, setContacts] = React.useState([
		{name: "Fulano", job: "Carpinteiro", country: "Brasil"},
		{name: "Ciclano", job: "Marceneiro", country: "Espanha"},
		{name: "Beltrano", job: "Pescador", country: "Portugal"}
	])

	return (
		<div style={{position:"absolute", top: 0, left: 0, width:"100%", height:"100%"}}>
			<Phone
				contacts={contacts}
				jobs={[
					"Carpinteiro",
					"Marceneiro",
					"Pescador"
				]}
				countries={[
					"Brasil",
					"Espanha",
					"Portugual"
				]}
				onAddContact={(newC)=>setContacts([...contacts, newC])}
			>
			</Phone>
		</div>
	)

	// -------------------------------------------
	// MODIFICAR SOMENTE ATÉ AQUI
	// -------------------------------------------
}

export default TestPage
