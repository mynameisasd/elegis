import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { ApiContext } from './App'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Cookies from 'universal-cookie'
import { useForm } from 'react-hook-form'


const ExcerptsForward = () => {

    const api = useContext(ApiContext)
    const navigate = useNavigate()
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
            navigate("/excerpts")
           

        })

    }


    return (

        <Container>
             <h1 className="excerpts-metadata-title">FORWARD EXCERPT</h1>
            <Row style={{'text-align':'left'}}>
                <Col md="3"> </Col>
                <Col md='6'>
                    <br/>
                    <div className='custom-shadow' style={{'padding':'15px', }}>
                        <Form onSubmit={handleSubmit(onSubmit)}>

                        <Form.Group className="mb-3" style={{'display':'none'}}>
                            <Form.Label>Excerpt ID:</Form.Label>
                            <Form.Control className='custom-textbox' type="date"  {...register("excerpt_id") }  />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>DATE:</Form.Label>
                            <Form.Control className='custom-textbox' placeholder='Date' type="date"  required {...register("date") } />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control className='custom-textbox' placeholder='Forwarded to' required type="text"  {...register("forwarded_to") } />
                        </Form.Group>

                        <Form.Label>TYPE:</Form.Label>
                        <Form.Select className='custom-textbox' aria-label="Default select example" {...register("type") }>
                            <option value="E-copy">E-copy</option>
                            <option value="Original">Original</option>
                        </Form.Select>
                        <br/>
                        <Form.Group className="mb-3">
                            <Form.Control className='custom-textbox'  placeholder='Number of copy' type="number" required  {...register("number_of_copy") } />
                        </Form.Group>   

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control placeholder='Remarks/Reason' className='custom-textbox' as="textarea" rows={3} {...register("reason") } />
                        </Form.Group>

                        <Form.Group className="mb-3" style={{'display':'none'}}>
                            <Form.Label>Forwarded By:</Form.Label>
                            <Form.Control type="text" defaultValue={user}  {...register("forwarded_by") } />
                        </Form.Group>   

                        <br/>

                        <Button className='custom-button' style={{width:'100%'}} type="submit" variant="success" >SUBMIT</Button>

                        </Form>
                    </div>
                </Col>
                <Col md="3"> </Col>
            </Row>

        </Container>
    )

}

export default ExcerptsForward