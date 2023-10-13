import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Container, Row, Col, Button, Form  } from 'react-bootstrap'
import axios from 'axios'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { ApiContext } from './App'


import GlobalNavigation from './global_components/GlobalNavigation'





const DTSReferral = () => {

    const api = useContext(ApiContext)
    const { id, dts , barcode } = useParams()
    const [ committee, setCommittee ] = useState([{}])
    const [ committeeToSubmit, setCommitteeToSubmit ] = useState([{}])
    const [ dateReferred, setDateReferred ] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{

        axios.post( api.dts + 'get_committee.php', )
            .then(function (response) {
        
                setCommittee(response.data)
    
            })

    },[])


    const handleCommittee = (selectedOptions) => {

        setCommitteeToSubmit(selectedOptions)

    }


    function onSubmit(){
      
        let data = {
            'date_referred': dateReferred,
            'committee': committeeToSubmit,
            'dts_id' : id
        }

        axios.post( api.dts + 'submit_referral.php', data )
            .then(function (response) {
        
                navigate("/dts_metadata/" + barcode + '/' + id)

    
            })

    }


    return(
        <div>
            <GlobalNavigation />
            
            
            <Container>
                <div className='custom-shadow' style={{padding:'15px', textAlign:'left'}}>
                    <h2>Referral</h2>
                    <h6>DTS No.: {dts}</h6>
                    <hr/>
                    <Row>
                    <Col>
                            <Select 
                                className='custom-textbox'
                                options={committee} 
                                isMulti
                                onChange={handleCommittee}
                            />
                            <br />
                            <Form.Group className="mb-3" controlId="location">
                                    <Form.Label>DATE REFERRED</Form.Label>
                                    <Form.Control className='custom-textbox' type="date"  placeholder="Date Referred" onChange={(e)=> setDateReferred(e.target.value)} required />
                                </Form.Group>

                            <br />
                            <Button className='custom-button' variant="success" onClick={onSubmit} size="sm">Submit</Button>
                        </Col>
                    </Row>

                </div>
                
            </Container>
            

        </div>
    )
}

export default DTSReferral