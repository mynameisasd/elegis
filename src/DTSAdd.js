import React, { useContext, useEffect, useState } from 'react'
import {Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Cookies from 'universal-cookie';

import { useNavigate  } from 'react-router-dom'

import GlobalNavigation from './global_components/GlobalNavigation';
import { ApiContext } from './App';
import LatestDTS from './global_components/LatestDTS';


const DTSAdd = () => {
    const cookies = new Cookies()
    const [ name, setName ] = useState('')
    const navigate = useNavigate()
    const api = useContext(ApiContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    

    const onSubmit = (data) => {

        axios.post( api.dts + 'add_dts.php', data )
        .then(function (response) {
    
            navigate('/dts_archive')

        })


    }

    useEffect(()=>{
       
        let name = cookies.get('user_info')
        setName(name.fname + ' ' + name.lname)

    },[])

    return (
        <div>
            <GlobalNavigation />
           
            <img alt="image" src="https://media.tenor.com/Trqn0AC_d98AAAAC/document-email.gif"  style={{'width':'150px'}} />
            <h1>
                 ADD DTS
            </h1>
            
            <br />
            <Container>
                <Row>
                    <Col>
                        <LatestDTS />
                    </Col>
                </Row>
                <hr/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row style={{'text-align':'left'}}>
                        <Col md="4">

                            <Form.Group className="mb-3" controlId="Contact Person">
                                <Form.Label>Document Type</Form.Label>
                                <Form.Select aria-label="Default select example" {...register("document_type") }>
                                    <option value="Supplemental">Supplemental</option>
                                    <option value="Barangay Annual Budget">Barangay Annual Budget</option>
                                    <option value="Barangay Supplemental">Barangay Supplemental</option>
                                    <option value="SK Annual Budget">SK Annual Budget</option>
                                    <option value="SK Supplemental">SK Supplemental</option>
                                    <option value="Authority to LCE">Authority to LCE</option>
                                    <option value="Accreditation">Accreditation</option>
                                    <option value="Endorsement">Endorsement</option>
                                    <option value="Thematic Plan">Thematic Plan</option>
                                    <option value="Special Education Fund">Special Education Fund</option>
                                    <option value="Barangay Resolution/Ordinance">Barangay Resolution/Ordinance</option>
                                    <option value="Others">Others</option>
                                </Form.Select>
                            </Form.Group>

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

                            

                        </Col>
                        <Col md="4">
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Subject</Form.Label>
                                <Form.Control as="textarea" rows={3}  {...register("subject")} required/>
                            </Form.Group>

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

                            <Form.Group className="mb-3 " style={{display:'none'}} controlId="Entered By">
                                <Form.Label>Entered BY</Form.Label>
                                <Form.Control type="text" value={name}  placeholder="Received By  " {...register("entered_by") } required    />
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