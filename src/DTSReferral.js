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
            
            <h1>Referral</h1>
            <br/>
            <br/>
            <h3>DTS No.: {dts}</h3>
            <br/>
            <Container>
                <Row>
                    <Col>

                        <Select 
                            options={committee} 
                            isMulti
                            onChange={handleCommittee}
                        />
                        <br />

                        <Form.Group className="mb-3" controlId="location">
                                <Form.Label>Date Referred</Form.Label>
                                <Form.Control type="date"  placeholder="Date Referred" onChange={(e)=> setDateReferred(e.target.value)} required />
                            </Form.Group>

                        <br />
                        <Button  variant="success" onClick={onSubmit} size="sm">Submit</Button>
                    </Col>
                </Row>
            </Container>
            

        </div>
    )
}

export default DTSReferral