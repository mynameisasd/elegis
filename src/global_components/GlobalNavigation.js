import React from 'react'
import { Container , Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const GlobalNavigation = () => {
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                <Navbar.Brand href="#home">E-Legis v2</Navbar.Brand>
                <Nav className="me-auto">
                <NavDropdown title="Excerpts" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">
                        <Link to="/add_excerpts">Add Excerpts</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                        <Link to="/excerpts">Excerpts Archive</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                        <Link to="/transfer_excerpts">Transfer Excerpts</Link>
                    </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Document Tracking" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">
                        <Link to="/dts_add">Add Dts</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action3">
                        <Link to="/dts_add_temp">Add Dts Temporary</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                        <Link to="/dts_archive">DTS Archive</Link>
                    </NavDropdown.Item>
                </NavDropdown>
              
                </Nav>
                </Container>
            </Navbar>
            <br/>
        </div>
    )
}

export default GlobalNavigation;