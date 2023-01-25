import React, { useContext, useState } from 'react';
import {Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ApiContext } from './App';
import Cookies from 'universal-cookie';

const  Login = () =>{

    const [ password, setPassword ] = useState('')
    const [ username, setUsername ] = useState('')
    const navigate = useNavigate()
    const api = useContext(ApiContext)
    const cookies = new Cookies()

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);

    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }


    const login = () => {

        let data = {
            'username': username,
            'password' : password
        }


        axios.post( api.excerpts + 'login.php', data )
        .then(function (response) {

            if(response.data == '')
            {
                alert('Error')
                setUsername('')
                setPassword('')
            }
            else
            {
                cookies.set('user_info', response.data[0])
                navigate('/excerpts')
            }

        })


    }

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <div>
                <img alt="image" src="https://gifimage.net/wp-content/uploads/2018/04/ragnarok-gif-10.gif" />
            </div>
            <h1 className='text-center'>E-Legis v2</h1>
            <Row>
                <Col>
                </Col>
                <Col>
                  
                    <div>
                        <Form.Label htmlFor="inputPassword5">Username:</Form.Label>
                        <br/>
                        <Form.Control
                            type="text"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            placeholder='Username'
                            value={username}
                            onChange={handleChangeUsername}
                        />
                    </div>
                    <div>
                    <Form.Label htmlFor="inputPassword5">Password:</Form.Label>
                    <br/>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            placeholder='Password'
                            value={password}
                            onChange={handleChangePassword}
                        />
                    </div>
                    <br/>
                    <br/>
                    <Button variant="success" onClick={login}>LOGIN</Button>
                </Col>
                <Col>
                </Col>
            </Row>
        </div>
    )
}

export default Login;