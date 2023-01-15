import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card, Form, Table } from 'react-bootstrap'
import axios from 'axios'
import GlobalNavigation from './global_components/GlobalNavigation'
import { Link } from 'react-router-dom'
import { ApiContext } from './App'

const TransmittalList = () => {


    const api = useContext(ApiContext)

    const [ transmittalList, setTransmittalList ] = useState([{}])

    useEffect( ()=> {

        let data = {
            'office': 'mayors'
        }
        axios.post( api.excerpts + 'get_transmittal_per_office.php', data )
        .then(function (response) {
    
            setTransmittalList(response.data)

        })

    },[])


    function handleOfficeChange(e){

        let data = { 
            'office': e.target.value
        }

        axios.post( api.excerpts + 'get_transmittal_per_office.php', data )
        .then(function (response) {
    
            setTransmittalList(response.data)

        })

    }


    return (
        <div>
            <GlobalNavigation />
            <h1>Transmittal List</h1>
            <br />
            <Container>
                <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="action_status">
                            <Form.Label>OFFICE</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={handleOfficeChange}>
                                <option  value="mayors">Mayors Office</option>
                                <option  value="records">Records Office</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}></Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Transfer Series</th>
                                            <th>Date</th>
                                            <th>Transferred By</th>
                                            <th>Scanned Copy</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {
                                            transmittalList.map((row, index)=>
                                                <tr key={index}>
                                                    <td> <Link target={"_blank"} to={"/print_transmittal_excerpts/"+ row.transfer_series}>{row.transfer_series}</Link></td>
                                                    <td>{row.date}</td>
                                                    <td>{row.released_by}</td>
                                                    <td>File.pdf</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                
            </Container>
            
        </div>
    )
}

export default TransmittalList