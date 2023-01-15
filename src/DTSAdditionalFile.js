import react, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import GlobalNavigation from './global_components/GlobalNavigation'
import { ApiContext } from './App'
import {  useNavigate, useParams } from 'react-router-dom'


const DTSAdditionalFile = () => {
    
    const navigate = useNavigate()
    const { barcode, id }  = useParams()
    const api = useContext(ApiContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [ pdf, setPdf ] = useState()


    const hanldeUpload = (e) => {

        setPdf(e.target.files[0])

    }


    const onSubmit = (data) => {

        let formdata = new FormData()

        formdata.append('date', data.date)
        formdata.append('remarks', data.remarks)
        formdata.append('filename', data.filename)
        formdata.append('added_by', data.added_by)
        formdata.append('pdf', pdf)
        formdata.append('barcode', barcode)


        axios.post( api.dts + 'additional_file.php', formdata)
        .then(function (response) {
    
            console.log(response.data)
            navigate('/dts_metadata/' + barcode + '/' + id)


        })

       
       

    }


    return (
        <div>
            <GlobalNavigation />
            <h1>Additional File</h1>
            <br />
            <br />
            <Container>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="DTS ">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" placeholder="Date" {...register("date")} required    />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="DTS ">
                                <Form.Label>File Name:</Form.Label>
                                <Form.Control type="text" placeholder="Filename" {...register("filename")} required    />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Remarks</Form.Label>
                                <Form.Control as="textarea" rows={3}  {...register("remarks")} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="DTS ">
                                <Form.Label>Added By:</Form.Label>
                                <Form.Control type="text" placeholder="Added By" {...register("added_by")} required    />
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload PDF File</Form.Label>
                                <Form.Control type="file" onChange={hanldeUpload} />
                            </Form.Group>
                            <br />
                            <br />
                            <Button type="submit" variant="success" size="sm" >Submit</Button>
                        </form>
                    </Col>
                    <Col md="3"></Col>
                </Row>
            </Container>
        </div>
    )

}

export default DTSAdditionalFile