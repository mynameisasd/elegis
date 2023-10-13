import React, { useContext, useState } from 'react'
import GlobalNavigation from './global_components/GlobalNavigation'
import { Container, Row, Col, Form, Button } from 'react-bootstrap' 
import { useParams, useNavigate } from 'react-router-dom'
import { ApiContext } from './App'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner';


const DTSUpload = () => {

    const api = useContext(ApiContext)
    const { id, dts } = useParams()
    const navigate = useNavigate()
    const [ pdf, setPdf ] = useState()
    const [ loader, setLoader ] = useState(false) 


    const hanldeUpload = (e) => {

        setPdf(e.target.files[0])

    }

    const upload = () => {
        
        setLoader(true)
        let formdata = new FormData()   

        formdata.append('pdf', pdf)
        formdata.append('id', id)


        axios.post( api.dts + 'upload_dts.php', formdata)
        .then(function (response) {
    
            alert('uploaded')
            navigate('/dts_archive')

        })

    }




    return (
        <div>
            <GlobalNavigation/>
            <br/>
            <Container>
               <div className='custom-shadow' style={{padding:'15px', textAlign:'left'}}>
                    <h1>DTS: {dts}</h1>
                    <hr/>
                    <Row>
                        <Col>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>UPLOAD FILE</Form.Label>
                            <Form.Control className='custom-textbox' type="file" onChange={hanldeUpload} />
                        </Form.Group>
                        <br/>
                        {
                            !loader ?  <Button className='custom-button' onClick={upload} variant="success" size="sm">UPLOAD</Button>
                            : <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        }
                    
                        </Col>
                    </Row>
               </div>
            </Container>
        </div>
    )
}

export default DTSUpload