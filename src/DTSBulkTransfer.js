import react, { useContext, useEffect, useState } from 'react'
import { ApiContext } from './App'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Select from 'react-select'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import GlobalNavigation from './global_components/GlobalNavigation'
import { useNavigate } from 'react-router-dom'


const DTSBulkTransfer = () => {

    const navigate = useNavigate()
    const [ searchDTS, setSearchDTS ] = useState([{}])
    const api = useContext(ApiContext)
    const { register, handleSubmit, watch, setValue , formState: { errors } } = useForm();
    const [ barcodeArraySubmit, setBarcodeArraySubmit ] = useState([{}]) 


  

    function handleSelectChange(selectedOptions) {

        setBarcodeArraySubmit(selectedOptions)

    }

    useEffect(()=>{

        axios.post( api.dts + 'get_document_basic_info_for_transfer.php', )
        .then(function (response) {
    
            setSearchDTS(response.data)

        })


    },[])


    const onSubmit = (data) =>
    {

        let new_data = {
            'info': data,
            'barcode_array': barcodeArraySubmit
        }

        axios.post( api.dts + 'bulk_transfer.php', new_data )
        .then(function (response) {
    
            let series = response.data

            
            navigate('/dts_bulk_transfer_print/' + series + '/' + data.transfer_by + '/' + data.date)

        })
    }


    
    return (
        <div>
            <GlobalNavigation />
            <h1>Document Transfer</h1>
            <br/>
            <br/>
            <Container>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <Form.Label>Select DTS No.</Form.Label>
                        <Select options={searchDTS} isMulti onChange={handleSelectChange} />
                        <br />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="date_adopted">
                                <Form.Label>Date Adopted</Form.Label>
                                <Form.Control type="date" placeholder="Date Adopted" {...register("date")} required  />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="date_adopted">
                                <Form.Label>Transfer By</Form.Label>
                                <Form.Control type="text" placeholder="Transfer By"  {...register("transfer_by")} required />
                            </Form.Group>

                            <br/>
                            <br/>
                            <Button type='submit' variant="success" size="sm" >Submit</Button>
                        </form>
                    </Col>
                    <Col md="3"></Col>
                </Row>
            </Container>
        </div>
    )
}

export default DTSBulkTransfer