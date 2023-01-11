import React, { useContext, useEffect, useState } from 'react'
import {Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { useNavigate, useParams  } from 'react-router-dom'

import GlobalNavigation from './global_components/GlobalNavigation';
import { ApiContext } from './App';


const DTSEdit = () => {

    const { barcode } = useParams()
    const navigate = useNavigate()
    const api = useContext(ApiContext)
    const { register, handleSubmit, watch, setValue , formState: { errors } } = useForm();
    const [ info, setInfo ] = useState([{}])

    const onSubmit = (data) => {

    
        axios.post( api.dts + 'edit_dts.php', data )
        .then(function (response) {
    
            navigate('/dts_metadata/' + barcode)

        })
       

    }

    useEffect(()=> {

        let obj_barcode = {
            barcode:barcode
        }

        axios.post( api.dts + 'get_dts_info_for_print.php', obj_barcode )
        .then(function (response) {
            
            let data = response.data

            setValue('dts', data[0]['dts'])
            setValue('barcode', data[0]['barcode'])
            setValue('from', data[0]['from'])
            setValue('subject', data[0]['subject'])
            setValue('attachments', data[0]['attachments'])
            setValue('remarks', data[0]['remarks'])
            setValue('date_received', data[0]['date_and_time'])
            setValue('contact_person',data[0]['contact_person'])
            setValue('action_status',data[0]['action_status'])
            setValue('received_by',data[0]['received_by'])
            setValue('location', data[0]['location'])
            

        })


    },[])

    return (
        <div>
            <GlobalNavigation />
            <h1>
                ADD DTS
            </h1>
            <br />
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md="4">
                            <Form.Group className="mb-3" controlId="DTS ">
                                <Form.Label>DTS No.</Form.Label>
                                <Form.Control type="number" placeholder="DTS No." {...register("dts")} required    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="date_received">
                                <Form.Label>Date Received</Form.Label>
                                <Form.Control type="date"  placeholder="Date Recived" {...register("date_received")} required    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="year">
                                <Form.Label>From</Form.Label>
                                <Form.Control type="text"  placeholder="From" {...register("from")} required    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Subject</Form.Label>
                                <Form.Control as="textarea"  rows={3}  {...register("subject")} required/>
                            </Form.Group>

                        </Col>
                        <Col md="4">

                            <Form.Group className="mb-3" controlId="-le">
                                <Form.Label>Attachments</Form.Label>
                                <Form.Control as="textarea"  rows={3}  {...register("attachments")} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Remarks</Form.Label>
                                <Form.Control as="textarea" rows={3}  {...register("remarks")} />
                            </Form.Group>

                            <Form.Group style={{'display': 'none'}} className="mb-3" controlId="barcode">
                                <Form.Label>Barcode</Form.Label>
                                <Form.Control type="text"  placeholder="From" {...register("barcode")} required    />
                            </Form.Group>

                        </Col>
                        <Col md="4">
                            
                            <Form.Group className="mb-3" controlId="Contact Person">
                                <Form.Label>Contact Person</Form.Label>
                                <Form.Control type="text"  placeholder="Contact Person" {...register("contact_person")} required    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Contact Person">
                                <Form.Label>Received By</Form.Label>
                                <Form.Control type="text"  placeholder="Received By  " {...register("received_by")} required    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="action_status">
                                <Form.Label>Action Status</Form.Label>
                                <Form.Select aria-label="Default select example" {...register("action_status") }>
                                    <option  value="active">Active</option>
                                    <option  value="Acted">Acted</option>
                                    <option value="Acted and Transfered">Acted and Transfered</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text"  placeholder="Location" {...register("location")} required    />
                            </Form.Group>
                            
                        </Col>
                    </Row>
                    <br />
                    <Button style={{width:'100%'}} type="submit" variant="success" >SUBMIT</Button>
                </form>
            </Container>
        </div>
    )   
}

export default DTSEdit