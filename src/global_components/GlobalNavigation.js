import React from 'react'
import { Container , Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { AiFillFileAdd } from "react-icons/ai";
import { BsFillArchiveFill, BsFillForwardFill, BsCardList } from 'react-icons/bs'

const GlobalNavigation = () => {
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                <Navbar.Brand href="#home">E-Legis v2</Navbar.Brand>
                <Nav className="me-auto">
                <NavDropdown title="Excerpts" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">
                        <Link className='color-white' to="/add_excerpts">Add < AiFillFileAdd style={{'font-size':'20px', 'float':'right', 'color':'black'}} /> </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action4">
                        <Link className='color-white' to="/excerpts">Archive <BsFillArchiveFill  style={{'font-size':'20px', 'float':'right', 'color':'black'}} /></Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action4">
                        <Link className='color-white' to="/transfer_excerpts">Transfer <BsFillForwardFill style={{'font-size':'20px', 'float':'right', 'color':'black'}} /> </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action4">
                        <Link className='color-white' to="/transmittal_list">Transmittal <BsCardList style={{'font-size':'20px', 'float':'right', 'color':'black'}}  /></Link>
                    </NavDropdown.Item>
                    
                </NavDropdown>
                <NavDropdown title="Document Tracking" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">
                        <Link className='color-white' to="/dts_add_temp">Add Temporary</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action3">
                        <Link className='color-white' to="/dts_add">Add < AiFillFileAdd style={{'font-size':'20px', 'float':'right', 'color':'black'}} /></Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action4">
                        <Link className='color-white' to="/dts_archive">Archive <BsFillArchiveFill  style={{'font-size':'20px', 'float':'right', 'color':'black'}} /></Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                        <Link className='color-white' to="/dts_bulk_transfer">Transfer <BsFillForwardFill style={{'font-size':'20px', 'float':'right', 'color':'black'}} /></Link>
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