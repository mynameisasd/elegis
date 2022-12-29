import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Tab, Tabs, Button  } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom';
import Barcode from 'react-barcode'
import axios from 'axios'
import { AiFillPrinter, AiOutlineUpload, AiFillEdit } from "react-icons/ai"
import { ApiContext } from './App';



const DTSMetaData = () => {

    const api = useContext(ApiContext)
    const { barcode } = useParams();
    const [ metadata, setMetadata ] = useState([{}])

    let data = {

        barcode:barcode
    }

    useEffect(()=>{

        axios.post( api.dts + 'get_metadata.php', data )
        .then(function (response) {
    
            setMetadata(response.data)
            console.log(response.data)

        })

    },[])


    return (
        <div>
            
            <Container>
                <Row>
                    <Col>
                        <div className='text-left'>
                            <h1 className='meta-data-header'>METADATA</h1>
                        </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md="1" className='text-right'>
                        <h6>DTS:</h6>
                    </Col>
                    <Col md="11" className='text-left'>
                        <h6>{metadata[0]['dts']}</h6>
                    </Col>
                </Row>
                <Row>
                    <Col md="1" className='text-right'>
                        <h6>Barcode:</h6>
                    </Col>
                    <Col md="2" className='text-left'>
                        <h6><Barcode value={barcode} /></h6>
                    </Col>
                    <Col md="7" className='text-left'>
                        
                    </Col>
                    <Col md="2">
                        <div className='text-right'>
                            <Button style={{'width':'100%'}} variant="info" size="sm" ><Link target={'_blank'} style={{'color':'white',  'text-decoration':'none'}} to={"/dts_print/" + barcode}><AiFillPrinter style={{'float':'left'}}/>print</Link></Button>
                            <br/>
                            <br/>
                            <Button size="sm" style={{'width':'100%'}}><Link target={'_blank'} to={"/dts_upload/" + metadata[0]['id'] + '/' + metadata[0]['dts']} style={{'color':'white',  'text-decoration':'none'}} > <AiOutlineUpload style={{'float':'left'}} /> upload file</Link></Button>
                            <br />
                            <br />
                            <Button size="sm" style={{'width':'100%'}}><Link target={'_blank'} to={"/dts_edit/" + metadata[0]['barcode']} style={{'color':'white',  'text-decoration':'none'}} > <AiFillEdit style={{'float':'left'}} /> edit</Link></Button>

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="1" className='text-right'>
                        <h6>Subject:</h6>
                    </Col>
                    <Col md="11" className='text-left'>
                        <h6>{metadata[0]['subject']}</h6>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Tabs
                            defaultActiveKey="info"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="info" title="Info">
                            <Row>
                                    <Col md="2" className='text-right'>
                                        Date and Time:
                                    </Col>
                                    <Col md="10" className='text-left'>
                                        {metadata[0].date_and_time}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2" className='text-right'>
                                        From:
                                    </Col>
                                    <Col md="10" className='text-left'>
                                        {metadata[0].from}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2" className='text-right'>
                                        Contact Person:
                                    </Col>
                                    <Col md="10" className='text-left'>
                                        {metadata[0].contact_person}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2" className='text-right'>
                                        Remarks:
                                    </Col>
                                    <Col md="10" className='text-left'>
                                        {metadata[0].remarks}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2" className='text-right'>
                                        Action Status:
                                    </Col>
                                    <Col md="10" className='text-left'>
                                        {metadata[0].action_status}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2" className='text-right'>
                                        Attachments:
                                    </Col>
                                    <Col md="10" className='text-left'>
                                        {metadata[0].attachments}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2" className='text-right'>
                                        Received By:
                                    </Col>
                                    <Col md="10" className='text-left'>
                                        {metadata[0].received_by}
                                    </Col>
                                </Row>
                                
                            </Tab>
                            <Tab eventKey="file" title="File">
                               <a href={api.dts + 'upload/' + metadata[0]['file']} target="_blank">{metadata[0]['file']}</a>
                            </Tab>
                            <Tab eventKey="action_taken" title="Action Taken" >
                               Tab 3
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default DTSMetaData