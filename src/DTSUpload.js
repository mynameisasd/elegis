import React, { useContext, useState } from 'react'
import GlobalNavigation from './global_components/GlobalNavigation'
import { Container, Row, Col, Form, Button } from 'react-bootstrap' 
import { useParams, useNavigate } from 'react-router-dom'
import { ApiContext } from './App'
import axios from 'axios'

const DTSUpload = () => {

    const api = useContext(ApiContext)
    const { id, dts } = useParams()
    const navigate = useNavigate()
    const [ pdf, setPdf ] = useState()


    const hanldeUpload = (e) => {

        setPdf(e.target.files[0])

    }

    const upload = () => {
        
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
                <h1>DTS: {dts}</h1>
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

export default DTSUpload