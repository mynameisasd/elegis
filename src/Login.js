import React, { useState } from 'react';
import {Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const  Login = () =>{

    const [ password, setPassword ] = useState('')
    const navigate = useNavigate()

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }


    const login = () => {
        if(password == "ssoforev")
        {
            navigate("/excerpts");
        }
        else
        {
            alert("error")
            setPassword('')
        }
    }

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <h1 className='text-center'>E-Legis v2</h1>
            <Row>
                <Col>
                </Col>
                <Col>
                    <div>
                    <Form.Label htmlFor="inputPassword5">Password:</Form.Label>
                    <br/>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        placeholder='Password'
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