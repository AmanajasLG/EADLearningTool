import React from 'react'
import {Nav, Navbar} from 'react-bootstrap'

const DefaultHeader = ({pageInfo}) => {

	return (
		<Navbar id="app-header">
            {/* <Navbar.Brand href="/">Navbar</Navbar.Brand> */}
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/">Sobre</Nav.Link>
                {/* <Nav.Link href="/login">Login</Nav.Link> */}
            </Nav>
        </Navbar>
	)
	
}

export default DefaultHeader