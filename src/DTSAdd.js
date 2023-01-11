import React, { useContext } from 'react'
import {Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { useNavigate  } from 'react-router-dom'

import GlobalNavigation from './global_components/GlobalNavigation';
import { ApiContext } from './App';


const DTSAdd = () => {

    const navigate = useNavigate()
    const api = useContext(ApiContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {

        axios.post( api.dts + 'add_dts.php', data )
        .then(function (response) {
    
            navigate('/dts_archive')

        })


    }

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
                                <Form.Control type="date" placeholder="Date Recived" {...register("date_received")} required    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="year">
                                <Form.Label>From</Form.Label>
                                <Form.Control type="text" placeholder="From" {...register("from")} required    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Subject</Form.Label>
                                <Form.Control as="textarea" rows={3}  {...register("subject")} required/>
                            </Form.Group>

                        </Col>
                        <Col md="4">

                            <Form.Group className="mb-3" controlId="-le">
                                <Form.Label>Attachments</Form.Label>
                                <Form.Control as="textarea" rows={3}  {...register("attachments")} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Remarks</Form.Label>
                                <Form.Control as="textarea" rows={3}  {...register("remarks")} />
                            </Form.Group>

                        </Col>
                        <Col md="4">
                            
                            <Form.Group className="mb-3" controlId="Contact Person">
                                <Form.Label>Contact Person</Form.Label>
                                <Form.Control type="text" placeholder="Contact Person" {...register("contact_person")} required    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Contact Person">
                                <Form.Label>Received By</Form.Label>
                                <Form.Control type="text" placeholder="Received By  " {...register("received_by")} required    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Contact Person">
                                <Form.Label>Action Status</Form.Label>
                                <Form.Select aria-label="Default select example" {...register("action_status") }>
                                    <option value="active">Active</option>
                                    <option value="Acted">Acted</option>
                                    <option value="Acted and Transfered">Acted and Transfered</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Contact Person">
                                <Form.Label>Entered By</Form.Label>
                                    <Form.Select aria-label="Default select example" {...register("entered_by") }>
                                        <option value="">select option</option>
                                        <option value="Jerick Buitizon">Jerick Buitizon</option>
                                        <option value="Sharmaine Tojon">Sharmaine Tojon</option>
                                        <option value="Marilou Nifras">Marilou Nifras</option>
                                    </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Contact Person">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" placeholder="Location" {...register("location")} required    />
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

export default DTSAdd