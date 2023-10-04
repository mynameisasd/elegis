import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { ApiContext } from './App'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Cookies from 'universal-cookie'
import { useForm } from 'react-hook-form'


const ExcerptsForward = () => {

    const api = useContext(ApiContext)
    const {id} = useParams()
    const cookies = new Cookies()
    const { register, handleSubmit, setValue , formState: { errors } } = useForm();


    const [ user, setUser ] = useState(''); 

    useEffect( ()=>{

        let info = cookies.get('user_info')
        setUser(info.fname + ' ' + info.lname)

        setValue('forwarded_by', user)
        setValue('excerpt_id', id)
      

    },[user])

   

    const onSubmit = (data) => {

        console.log(data)

        axios.post( api.excerpts + 'forward_excerpt.php', data )
        .then(function (response) {
    
            console.log(response.data)
           

        })

    }


    return (

        <Container>
             <h1 className="excerpts-metadata-title">FORWARD EXCERPT</h1>
            <Row style={{'text-align':'left'}}>
                <Col md='6'>
                    <br/>
                    <Form onSubmit={handleSubmit(onSubmit)}>

                        <Form.Group className="mb-3" style={{'display':'none'}}>
                            <Form.Label>Excerpt ID:</Form.Label>
                            <Form.Control type="date"  {...register("excerpt_id") }  />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date:</Form.Label>
                            <Form.Control type="date"  {...register("date") } />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Forwarded to:</Form.Label>
                            <Form.Control type="text"  {...register("forwarded_to") } />
                        </Form.Group>

                        <Form.Label>Type:</Form.Label>
                        <Form.Select aria-label="Default select example" {...register("type") }>
                            <option value="E-copy">E-copy</option>
                            <option value="Original">Original</option>
                        </Form.Select>
                        <br/>
                        <Form.Group className="mb-3">
                            <Form.Label>Number of Copy:</Form.Label>
                            <Form.Control type="number"  {...register("number_of_copy") } />
                        </Form.Group>   
                        
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Remarks/Reason:</Form.Label>
                            <Form.Control as="textarea" rows={3} {...register("reason") } />
                        </Form.Group>

                        <Form.Group className="mb-3" style={{'display':'none'}}>
                            <Form.Label>Forwarded By:</Form.Label>
                            <Form.Control type="text" defaultValue={user}  {...register("forwarded_by") } />
                        </Form.Group>   

                        <br/>

                        <Button style={{width:'100%'}} type="submit" variant="success" >SUBMIT</Button>

                    </Form>

                </Col>
            </Row>

        </Container>
    )

}

export default ExcerptsForward