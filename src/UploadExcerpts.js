import React, { useState, useContext } from 'react'
import { useParams, useNavigate   } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import GlobalNavigation from './global_components/GlobalNavigation'
import axios from 'axios'
import { ApiContext } from './App'

const UploadExcerpts = () => {

    const navigate = useNavigate()
    const api = useContext(ApiContext)
    const { id, reference_number } = useParams()
    const [ pdf, setPdf ] = useState()


    const hanldeUpload = (e) => {

        setPdf(e.target.files[0])

    }

    const upload = () => {
        
        let formdata = new FormData()

        formdata.append('pdf', pdf)
        formdata.append('id', id)


        axios.post( api.excerpts + 'upload_pdf.php', formdata)
        .then(function (response) {
    
            alert('uploaded')
            navigate('/excerpts')

        })


    }


    return (
        <div>   
            <GlobalNavigation />
            <Container>
                <div className='custom-shadow' style={{padding:'15px', textAlign:'left'}}> 
                    <h2>Reference Number: {reference_number}</h2>
                    <hr/>
                    <Row>
                        <Col>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>UPLOAD FILE</Form.Label>
                            <Form.Control className='custom-textbox' type="file" onChange={hanldeUpload} />
                        </Form.Group>
                        <br/>

                        <Button className='custom-button' onClick={upload} variant="success" size="sm">UPLOAD</Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default UploadExcerpts