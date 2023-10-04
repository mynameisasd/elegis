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
    const { register, handleSubmit, formState: { errors } } = useForm();

    

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
           
          
            
            <br />
            <Container style={{ padding: '15px' , background:'white' }}>
                <Row>
                    <Col>
                        <h4 className='text-left'> DOCUMENT TRACKING SYSTEM / <span style={{color:'red'}}>ADD DTS</span></h4>
                                    
                        <LatestDTS />
                    </Col>
                </Row>
                <hr/>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row style={{'text-align':'left'}}>
                        <Col md="4">

                            <Form.Group className="mb-3" controlId="Contact Person">
                                <Form.Label>DOCUMENT TYPE</Form.Label>
                                <Form.Select className='custom-textbox' aria-label="Default select example" {...register("document_type") }>
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
                                    <option value="Reclassification">Reclassification</option>
                                    <option value="Others">Others</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3 " controlId="DTS ">
                                <Form.Control className='custom-textbox' type="number" placeholder="DTS No." {...register("dts")} required    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="date_received">
                                <Form.Label>DATE RECEIVED</Form.Label>
                                <Form.Control className='custom-textbox' type="date" placeholder="Date Recived" {...register("date_received")} required    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="year">
                                <Form.Control className='custom-textbox' type="text" placeholder="From" {...register("from")} required    />
                            </Form.Group>

                            

                        </Col>
                        <Col md="4">
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Control className='custom-textbox' as="textarea" placeholder='Subject' rows={3}  {...register("subject")} required/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="-le">
                                <Form.Label></Form.Label>
                                <Form.Control className='custom-textbox' placeholder='Attachments' as="textarea" rows={3}  {...register("attachments")} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="title">
                                  <Form.Control className='custom-textbox' placeholder='Remarks' as="textarea" rows={3}  {...register("remarks")} />
                            </Form.Group>

                        </Col>
                        <Col md="4">
                            
                            <Form.Group className="mb-3" controlId="Contact Person">
                                <Form.Control className='custom-textbox' type="text" placeholder="Contact Person" {...register("contact_person")} required    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Contact Person">
                                <Form.Control className='custom-textbox' type="text" placeholder="Received By  " {...register("received_by")} required    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Contact Person">
                                <Form.Label>STATUS</Form.Label>
                                <Form.Select className='custom-textbox' aria-label="Default select example" {...register("action_status") }>
                                    <option value="active">ACTIVE</option>
                                    <option value="Acted">ACTED</option>
                                    <option value="Acted and Transfered">ACTED & TRANSFERRED</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3 " style={{display:'none'}} controlId="Entered By">
                                <Form.Label>Entered BY</Form.Label>
                                <Form.Control className='custom-textbox' type="text" value={name}  placeholder="Received By  " {...register("entered_by") } required    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Contact Person">
                                <Form.Control className='custom-textbox' type="text" placeholder="Location" {...register("location")} required    />
                            </Form.Group>
                            
                        </Col>
                    </Row>
                    <br />
                    <Button style={{width:'100%'}} className='custom-button' type="submit" variant="success" >SUBMIT</Button>
                </form>
            </Container>
        </div>
    )   
}

export default DTSAdd