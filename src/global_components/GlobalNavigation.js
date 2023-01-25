import React, { useContext, useState } from 'react'
import { Container, Row, Col , Nav, Navbar, NavDropdown, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { AiFillFileAdd } from "react-icons/ai";
import { BsFillArchiveFill, BsFillForwardFill, BsCardList } from 'react-icons/bs'
import { ApiContext } from '../App';
import Cookies from 'universal-cookie/cjs/Cookies';
import { useEffect } from 'react';

const GlobalNavigation = () => {
    const cookies = new Cookies()
    const navigate = useNavigate()
    const api = useContext(ApiContext)
    const [ userFullName, setUserFullName ] = useState('')

    useEffect(()=> {

       if(cookies.get('user_info') == null)
       {     
            //back to login
            navigate('/')
       }
       else
       {
         let info = cookies.get('user_info')
     
         console.log(info)
         setUserFullName(info.fname + ' ' + info.lname)
       }

    },[])


    const logout = () => {

        cookies.remove('user_info')
        navigate('/')

    }

    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                <Navbar.Brand href="#home"><img style={{'width':'50px','display':'inline-block'}} src={api.dts + '/img/SBLOGO2019.png'} /><Link className='color-white' to="/dashboard"><strong>E-Legis v2</strong></Link></Navbar.Brand>
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
                <Row>
                    <Col>
                        <div>
                            <img style={{'width':'50px'}} alt="iconuser" src="https://tcrf.net/images/3/39/RO-unused-hairanimation-swordsman-m-attack1.gif" />
                            <small><strong>Hi!  {userFullName}</strong></small>
                        </div>
                        <Button size="sm" variant="danger" onClick={logout} >LOGOUT</Button>
                    </Col>
                </Row>
                </Container>
            </Navbar>
            <br/>
        </div>
    )
}

export default GlobalNavigation;