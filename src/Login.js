import React, { useContext, useState } from 'react';
import {Row, Col, Form, Button , Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ApiContext } from './App';
import Cookies from 'universal-cookie';
import { AiFillLock } from "react-icons/ai";


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

        if( username != '' || password != '')
        {
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
        else
        {
            alert('Error')
        }
         
           

    }

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <Card style={{ padding: '50px',width: '50%', margin: 'auto', borderRadius: '0' , boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <Card.Body>

                {/* <div>
                    <img alt="image" style={{'width': '200px'}} src="https://cdn.dribbble.com/users/1746237/screenshots/11276091/media/fa47c19cbbbc00b2f5eceda0459c34db.gif" />
                </div>
                <h1 className='text-center'>E-Legis v2</h1>  */}
                    <AiFillLock className='lock-icon' />
                    <div>
                        <br/>
                        <Form.Control
                            className='login-text-box'
                            type="text"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            placeholder='Username'
                            value={username}
                            onChange={handleChangeUsername}
                        />
                    </div>
                    <div>
                    <br/>
                        <Form.Control
                            className='login-text-box'
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
                    <Button className='login-button' variant="success" onClick={login}>LOGIN</Button>
                 
                    <hr />
                    <span style={{'font-size':'9px'}}>ELEGIS v2</span>
                    
               
            </Card.Body>
            </Card>
            
            
        </div>
    )
}

export default Login;