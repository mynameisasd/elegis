import React, { useContext, useEffect, useState } from 'react'
import {Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { useNavigate, useParams  } from 'react-router-dom'

import GlobalNavigation from './global_components/GlobalNavigation';
import { ApiContext } from './App';


const DTSEdit = () => {

    const { barcode, id } = useParams()
    const navigate = useNavigate()
    const api = useContext(ApiContext)
    const { register, handleSubmit, watch, setValue , formState: { errors } } = useForm();
    const [ info, setInfo ] = useState([{}])

    const onSubmit = (data) => {

        axios.post( api.dts + 'edit_dts.php', data )
        .then(function (response) {
    
            navigate('/dts_metadata/' + barcode + '/' + id)

        })
       
    }

    useEffect(()=> {

        let obj_barcode = {
            barcode:barcode
        }

        axios.post( api.dts + 'get_dts_info_for_print.php', obj_barcode )
        .then(function (response) {
            
            let data = response.data

            setValue('document_type', data[0]['document_type'])
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
            
            <Container>
               
                <div className='custom-shadow' style={{padding:'15px'}}>
                    <Row>
                        <Col>
                            <h4 className='text-left'> DOCUMENT TRACKING SYSTEM / <span style={{color:'red'}}>ADD DTS</span></h4>
                                        
                        </Col>
                    </Row>
                    <hr/>
                    <form onSubmit={handleSubmit(onSubmit)} style={{textAlign:'left'}}>
                        <Row>
                            <Col md="4">
                                <Form.Group className="mb-3" controlId="Contact Person">
                                    <Form.Label>DOCUMENT TYPE</Form.Label>
                                    <Form.Select className='custom-textbox' aria-label="Default select example"  {...register("document_type") }>
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

                                <Form.Group className="mb-3" controlId="DTS ">
                                    <Form.Label>DTS NO.</Form.Label>
                                    <Form.Control className='custom-textbox' type="number" placeholder="DTS No." {...register("dts")} required    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="date_received">
                                    <Form.Label>DATE RECEIVED</Form.Label>
                                    <Form.Control className='custom-textbox' type="date"  placeholder="Date Recived" {...register("date_received")} required    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="year">
                                    <Form.Label>FROM</Form.Label>
                                    <Form.Control className='custom-textbox' placeholder="from" type="text"  {...register("from")} required    />
                                </Form.Group>

                                

                            </Col>
                            <Col md="4">

                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Label>SUBJECT</Form.Label>
                                    <Form.Control as="textarea" className='custom-textbox'  rows={3}  {...register("subject")} required/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="-le">
                                    <Form.Label>ATTACHMENTS</Form.Label>
                                    <Form.Control className='custom-textbox' as="textarea"  rows={3}  {...register("attachments")} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Label>REMARKS</Form.Label>
                                    <Form.Control className='custom-textbox' as="textarea" rows={3}  {...register("remarks")} />
                                </Form.Group>

                                <Form.Group style={{'display': 'none'}} className="mb-3" controlId="barcode">
                                    <Form.Label>BARCODE</Form.Label>
                                    <Form.Control className='custom-textbox' type="text"  placeholder="From" {...register("barcode")} required    />
                                </Form.Group>

                            </Col>
                            <Col md="4">
                                
                                <Form.Group className="mb-3" controlId="Contact Person">
                                    <Form.Label>CONTACT PERSON</Form.Label>
                                    <Form.Control className='custom-textbox' type="text"  placeholder="Contact Person" {...register("contact_person")} required    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Contact Person">
                                    <Form.Label>RECEIVED BY</Form.Label>
                                    <Form.Control className='custom-textbox' type="text"  placeholder="Received By  " {...register("received_by")} required    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="action_status">
                                    <Form.Label>STATUS</Form.Label>
                                    <Form.Select className='custom-textbox' aria-label="Default select example" {...register("action_status") }>
                                        <option  value="active">Active</option>
                                        <option  value="Acted">Acted</option>
                                        <option value="Acted and Transfered">Acted and Transfered</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="location">
                                    <Form.Label>LOCATION</Form.Label>
                                    <Form.Control className='custom-textbox' type="text"  placeholder="Location" {...register("location")} required    />
                                </Form.Group>
                                
                            </Col>
                        </Row>
                        <br />
                        <Button className='custom-button' style={{width:'100%'}} type="submit" variant="success" >SUBMIT</Button>
                    </form>
                </div>
            </Container>
        </div>
    )   
}

export default DTSEdit