import React, { useContext, useEffect } from 'react'
import GlobalNavigation from './global_components/GlobalNavigation'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ApiContext } from './App'
import { useNavigate, useParams } from 'react-router-dom'


const EditExcerpts = () => {

    const { id } = useParams()
    const api = useContext(ApiContext);
    const { register, handleSubmit, watch, setValue,  formState: { errors } }  = useForm()
    const navigate = useNavigate()


    const onSubmit = (data) => {


        axios.post( api.excerpts + 'edit_excerpts.php', data)
        .then(function (response) {
    
            navigate("/excerpts")

        })

    }


    useEffect(()=>{

        let obj_data = {
            id:id
        }

        axios.post( api.excerpts + 'get_excerpt_using_id.php', obj_data)
        .then(function (response) {
            
            let data = response.data
            console.log(data)

            setValue('year', data[0]['e_year'])
            setValue('excerpt', data[0]['e_excerpts'])
            setValue('excerpt_type', data[0]['e_excerptsType'])
            setValue('reference_number', data[0]['e_referenceNumber'])
            setValue('title', data[0]['e_title'])
            setValue('sponsored_by', data[0]['e_sponsors'])
            setValue('authored_by', data[0]['e_authors'])
            setValue('certified_by', data[0]['e_certifiedBy'])
            setValue('attested_by', data[0]['e_attested'])
            setValue('approved_by', data[0]['e_approved'])
            setValue('date_adopted', data[0]['e_dateAdopted'])
            setValue('date_approved', data[0]['e_dateApproved'])

            setValue('id', data[0]['e_id'])

        })

    },[])


    return (
        <div>
            <GlobalNavigation />
            <Container>
                <div className='custom-shadow' style={{padding:'15px', textAlign:'left'}}>
                    <Row>
                        <Col>
                            <h4 className='text-left'> RESOLUTIONS/ORDINANCES / <span style={{color:'red'}}>ADD EXCERPTS</span></h4>
                        </Col>
                    </Row>
                    
                    <hr/>
                    <br />
                    <form onSubmit={handleSubmit(onSubmit)}>  
                        <Row>
                            <Col md="4">
                            <Form.Group className="mb-3" controlId="year">
                                <Form.Label>YEAR</Form.Label>
                                <Form.Control className='custom-textbox' type="number" placeholder="Year" {...register("year")} required    />
                            </Form.Group>

                            <Form.Label>EXCERPTS</Form.Label>
                            <Form.Select  className='custom-textbox' aria-label="Default select example" {...register("excerpt") }>
                                <option value="Resolution">Resolution</option>
                                <option value="Ordinance">Ordinance</option>
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
                                <option value="Finance, Budget Appropriations">Finnce, Budget Appropriations</option>
                                <option value="In-House Resolution">In-House Resolution</option>
                                <option value="Local Policy Imposition">Local Policy Imposition</option>
                                <option value="Request for assistance to other Agencies">Request for assistance to other Agencies</option>
                                <option value="Resolution of Commendation">Resolution of Commendation</option>
                                <option value="Others" >Others</option>
                            </Form.Select>
                            <br/>
                            <Form.Group className="mb-3" controlId="reference_number" >
                                <Form.Label>REFERENCE NO.</Form.Label>
                                <Form.Control className='custom-textbox' type="text" placeholder="Reference Number" {...register("reference_number")} required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>TITLE</Form.Label>
                                <Form.Control className='custom-textbox' as="textarea" rows={3}  {...register("title")} required/>
                            </Form.Group>

                            </Col>
                            <Col md="4">

                                <Form.Group className="mb-3" controlId="sponsored_by">
                                    <Form.Label>SPONSORED BY</Form.Label>
                                    <Form.Control className='custom-textbox' type="text" placeholder="Sponsored By"  {...register("sponsored_by")} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="authored_by">
                                    <Form.Label>AUTHORED BY</Form.Label>
                                    <Form.Control className='custom-textbox' type="text" placeholder="Authored By" {...register("authored_by")} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="certified">
                                    <Form.Label>CERTIFIED BY</Form.Label>
                                    <Form.Control className='custom-textbox' type="text" placeholder="Certified  By" {...register("certified_by")}  required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="attested">
                                    <Form.Label>ATTESTED BY</Form.Label>
                                    <Form.Control className='custom-textbox' type="text" placeholder="Attested By" {...register("attested_by")} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Approved By">
                                    <Form.Label>APPROVED BY</Form.Label>
                                    <Form.Control className='custom-textbox' type="text" placeholder="Approved By" {...register("approved_by")} required />
                                </Form.Group>

                            </Col>
                            <Col>

                                <Form.Group className="mb-3" controlId="date_adopted">
                                    <Form.Label>DATE Adopted</Form.Label>
                                    <Form.Control type="text" className='custom-textbox' placeholder="Date Adopted"  {...register("date_adopted")} required />
                                </Form.Group>
                                
                                <Form.Group className="mb-3" controlId="date_approved">
                                    <Form.Label>DATE APPROVED</Form.Label>
                                    <Form.Control type="text" className='custom-textbox' placeholder="Date Approved" {...register("date_approved")} />
                                </Form.Group>

                                <Form.Group style={{'display':'none'}} className="mb-3" controlId="id">
                                    <Form.Label>Id</Form.Label>
                                    <Form.Control type="text" placeholder="Date Approved" {...register("id")} />
                                </Form.Group>

                            </Col>
                        </Row>
                        <br />
                        <br />
                        <Row>
                            <Button className='custom-button'  type="submit" variant="success">Submit</Button>
                        </Row>
                    </form>
                </div>
                
            </Container>
           
        </div>
    )
}

export default EditExcerpts