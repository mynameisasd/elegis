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
                <h1>Reference Number: {reference_number}</h1>
                <br/>
                <Row>
                    <Col>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload PDF File</Form.Label>
                        <Form.Control type="file" onChange={hanldeUpload} />
                    </Form.Group>
                    <br/>

                    <Button onClick={upload} variant="success" size="sm">UPLOAD</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UploadExcerpts