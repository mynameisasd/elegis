import React, { useState, useContext, useEffect } from 'react'
import GlobalNavigation from './global_components/GlobalNavigation'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { set, useForm } from 'react-hook-form'
import axios from 'axios'
import { ApiContext } from './App'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'


const AddExcerpts = () => {

    const cookies = new Cookies()
    const [ name , setName  ] = useState('')
    const navigate = useNavigate()
    const api = useContext(ApiContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [ refNumberChecker, setRefNumberChecker ] = useState('');


    const onSubmit = (data) => {

        console.log(data);

        axios.post( api.excerpts + 'add_excerpts.php', data)
        .then(function (response) {
            
            alert("Saved")
            navigate("/excerpts")
            
        })

    }


    function handleRefCheck(e){
        let data = {
            reference_number : e
        }
        axios.post( api.excerpts + 'check_reference_number.php', data)
        .then(function (response) {
          
            if(response.data == 'exist')
            {
                setRefNumberChecker('Reference Number Exist')
            }
            else
            {
                setRefNumberChecker('');
            }
        })

    }

    useEffect(()=>{
       
        let name = cookies.get('user_info')
        setName(name.fname + ' ' + name.lname)

    },[])

    return (
        <div>
            <GlobalNavigation />
            <Container style={{margin: '0 auto', background:'white', padding: '15px'}}>

                <form onSubmit={handleSubmit(onSubmit)} style={{textAlign:'left', padding:'15px'}} className='custom-shadow' > 

                <Row>
                    <Col>
                        <h4 className='text-left'> RESOLUTIONS/ORDINANCES / <span style={{color:'red'}}>ADD EXCERPTS</span></h4>
                     </Col>
                </Row>
                
                <hr/>
                <br />
                    <Row>
                        <Col md="4">
                        <Form.Group className="mb-3" controlId="year">
                            <Form.Control className='custom-textbox' type="number" placeholder="Year" {...register("year")} required    />
                        </Form.Group>

                        <Form.Label>EXCERPT</Form.Label>
                        <Form.Select className='custom-textbox' aria-label="Default select example" {...register("excerpt") }>
                            <option value="Resolution">RESOLUTION</option>
                            <option value="Ordinance">ORDINANCE</option>
                        </Form.Select>
                        <br/>
                        <Form.Label>EXCERPT TYPE</Form.Label >
                        <Form.Select className='custom-textbox' aria-label="Default select example" {...register("excerpt_type")}>
                            <option value="Accreditation - NGO/PO">Accreditation - NGO/PO</option>
                            <option value="Adoption of Plan/PPAs">Adoption of Plan/PPAs</option>
                            <option value="Authority to the Local Chief Executive">Authority to the Local Chief Executive</option>
                            <option value="Endorsement for tenurial Instrument (FLAGT, CBFMA, SLUP, Etc)">Endorsement for tenurial Instrument (FLAGT, CBFMA, SLUP, Etc)</option>
                            <option value="Endorsement of Reclassification">Endorsement of Reclassification</option>
                            <option value="Endorsement of Project / Activity (Infrastructure, Research, Etc)">Endorsement of Project / Activity (Infrastructure, Research, Etc)</option>
                            <option value="Finance, Budget Appropriations">Finance, Budget Appropriations</option>
                            <option value="In-House Resolution">In-House Resolution</option>
                            <option value="Local Policy Imposition">Local Policy Imposition</option>
                            <option value="Request for assistance to other Agencies">Request for assistance to other Agencies</option>
                            <option value="Resolution of Commendation">Resolution of Commendation</option>
                            <option value="Others" >Others</option>
                        </Form.Select>
                        <br/>
                        <Form.Group className="mb-3" controlId="reference_number" >
                            <Form.Control className='custom-textbox' type="text" placeholder="Reference Number"   {...register("reference_number", { onBlur:(e) => handleRefCheck(e.target.value) })} />
                            <small style={{color:'red'}}>{refNumberChecker}</small>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="title">
                            <Form.Control className='custom-textbox' placeholder='Title' as="textarea" rows={3}  {...register("title")} required/>
                        </Form.Group>

                        </Col>
                        <Col md="4">

                            <Form.Group className="mb-3" controlId="sponsored_by">
                                <Form.Control className='custom-textbox' type="text" placeholder="Sponsored By"  {...register("sponsored_by")} required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="authored_by">
                                <Form.Control className='custom-textbox' type="text" placeholder="Authored By" {...register("authored_by")} required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="certified">
                                <Form.Control className='custom-textbox' type="text" placeholder="Certified  By" {...register("certified_by")}  required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="attested">
                                <Form.Control className='custom-textbox' type="text" placeholder="Attested By" {...register("attested_by")} required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Approved By">
                                <Form.Control className='custom-textbox' type="text" placeholder="Approved By" {...register("approved_by")} required />
                            </Form.Group>

                        </Col>
                        <Col>

                            <Form.Group className="mb-3" controlId="date_adopted">
                                <Form.Label>DATE ADOPTED</Form.Label>
                                <Form.Control className='custom-textbox' type="date" placeholder="Date Adopted"  {...register("date_adopted")} required />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="date_approved">
                                <Form.Label>DATE APPROVED</Form.Label>
                                <Form.Control className='custom-textbox' type="date" placeholder="Date Approved" {...register("date_approved")} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="entered_by" style={{'display':'none'}}>
                                <Form.Label>Entered By</Form.Label>
                                <Form.Control type="text" placeholder="Entered By" value={name} {...register("entered_by")} />
                            </Form.Group>

                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row style={{margin:'0'}}>
                        <Button  className='custom-button' type="submit" variant="success" disabled={ refNumberChecker == 'Reference Number Exist' ? true : false } >Submit</Button>
                    </Row>
                </form>
            </Container>
           
        </div>
    )
}

export default AddExcerpts