import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Tab, Tabs, Button, DropdownButton, Dropdown, ButtonGroup , ListGroup  } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom';
import Barcode from 'react-barcode'
import axios from 'axios'
import { AiFillPrinter, AiOutlineUpload, AiFillEdit } from "react-icons/ai"
import { ApiContext } from './App';
import DisplayReferral from './global_components/DisplayReferral';
import { AiTwotonePushpin } from "react-icons/ai";
import DocumentStatusStyle from './global_components/DocumentStatusStyle';
import DTSApproved from './global_components/DTSApproved';




const DTSMetaData = () => {

    const api = useContext(ApiContext)
    const { barcode, id } = useParams();
    const [ metadata, setMetadata ] = useState([{}])
    const [ referral, setReferral ] = useState([{}])
    const [ transferrredInfo, setTransferredInfo ] = useState([{}])  
    const [ additionalFile, setAdditionalFile ] = useState([{}])

    let data = {

        barcode:barcode
    }

    useEffect(()=>{

        axios.post( api.dts + 'get_metadata.php', data )
        .then(function (response) {
    
            setMetadata(response.data)

        })

        

    },[])

    useEffect( ()=> {

        //referrals
        let ref_data = {
            'dts_id' : id
        }

        axios.post( api.dts + 'get_referral.php', ref_data )
        .then(function (response) {
    
            setReferral(response.data)

        })


        //transferred documents
        let transferred_dts = {
            'barcode' : barcode
        }

        axios.post( api.dts + 'get_transferred_info.php', transferred_dts )
        .then(function (response) {
    
            setTransferredInfo(response.data)

        })


         //additional Files
         let additional_files = {
            'barcode' : barcode
        }

        axios.post( api.dts + 'get_additional_files.php', additional_files )
        .then(function (response) {
    
            setAdditionalFile(response.data)

        })


      
        
    },[])
    
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
     

    return (
        <div>
            
            <Container>
                <Row>
                    <Col>
                        <div className='text-left'>
                            <h1 className='meta-data-header'>DTS METADATA</h1>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className='text-right'>
                            <ButtonGroup>
                                <DropdownButton as={ButtonGroup} title="ACTIONS" id="bg-nested-dropdown">
                                    <Dropdown.Item eventKey="2"><Link  to={"/dts_print/" + barcode} style={{ 'color':'black', 'text-decoration':'none'}} > <AiFillPrinter style={{'float':'right','font-size':'20px'}} />PRINT</Link></Dropdown.Item>
                                    <Dropdown.Item eventKey="2"><Link  to={"/dts_upload/" + metadata[0]['id'] + '/' + metadata[0]['dts']} style={{ 'color':'black', 'text-decoration':'none'}} > <AiOutlineUpload style={{'float':'right','font-size':'20px'}} />   UPLOAD FILE</Link></Dropdown.Item>
                                    <Dropdown.Item eventKey="3"><Link  to={"/dts_edit/" + metadata[0]['barcode'] + '/' + metadata[0]['id']} style={{'color':'black',  'text-decoration':'none'}} > <AiFillEdit style={{'float':'right', 'font-size':'20px'}} /> EDIT</Link></Dropdown.Item>
                                    <Dropdown.Item disabled={ Object.keys(referral).length  > 0 ? true : '' } eventKey="4"><Link  to={"/dts_referral/" + metadata[0]['id']+ "/" + metadata[0]['dts'] + "/" + metadata[0]['barcode']} style={{ 'color':'black', 'text-decoration':'none'}} > <AiFillEdit style={{'float':'right', 'font-size':'20px'}} /> REFERRAL</Link></Dropdown.Item>
                                    <Dropdown.Item eventKey="4"><Link  to={"/dts_additional_file/" + metadata[0]['barcode'] + '/' + metadata[0]['id']} style={{ 'color':'black', 'text-decoration':'none'}} > <AiFillEdit style={{'float':'right', 'font-size':'20px'}} />ADDITIONAL FILE</Link></Dropdown.Item>
                                </DropdownButton>
                            </ButtonGroup>
                        </div>
                    </Col>    
                </Row> 
                <br />
                <Row>
                    <Col>
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
                                
                            </Col>
                        </Row>
                    </Col>
                    <Col md="2">
                        <img  style={{'width':'100px', 'float':'right'}} alt="logo" src={api.dts + "/img/SBLOGO2019.png"} />
                    </Col>
                </Row>
                
                <br/>
                <br/>
                <Row>
                    <Col md="1" className='text-right'>
                        <h6>Subject:</h6>
                    </Col>
                    <Col md="11" className='text-left'>
                        <strong>
                             <h6>{metadata[0]['subject']}</h6>
                        </strong>
                        
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
                                        <DocumentStatusStyle  status={metadata[0]['action_status']} />
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

                                <Row>
                                    <Col md="2" className='text-right'>
                                        Location:
                                    </Col>
                                    <Col md="10" className='text-left'>
                                        {metadata[0].location}
                                    </Col>
                                </Row>
                                
                            </Tab>
                            <Tab eventKey="file" title="File">
                               <a href={api.dts + 'upload/' + metadata[0]['file']} target="_blank">{metadata[0]['file']}</a>
                            </Tab>
                            <Tab eventKey="action_taken" title="Action Taken" >
                                <Row>
                                    <Col md="4"></Col>
                                    <Col>
                                        
                                        
                                        {
                                             Object.keys(referral).length > 0 ? <div><h5>Referral</h5><h6 style={{'text-align':'left'}}>Date Referred: {referral[0]['date_referred']}</h6></div>: ''
                                        }
                                        
                                        {   
                                            referral != '' ?
                                            referral.map((row, index )=>
                                                <div>  <DisplayReferral  committee_id={row.committee_id} /> </div>
                                            ): ''
                                        }
                                        <hr />
                                    </Col>
                                    <Col md="4"></Col>
                                </Row>

                                
                                <Row>
                                    <Col md="4"></Col>
                                    <Col>
                                        {
                                             Object.keys(additionalFile).length > 0 ? <div><h5>Additional File/Files</h5></div>: ''
                                        }
                                       {
                                        additionalFile != '' ?
                                        additionalFile.map((row, index)=>
                                            <ListGroup key={index}>
                                                <ListGroup.Item>
                                                    <p>Date: {row.date}</p>
                                                    <p>Remarks: {row.remarks}</p>
                                                    <p>File: <a href={'http://192.168.0.106/document_tracking/upload/' + row.file_name} target="_blank">{row.file_name}</a> </p>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        ) 
                                        : ''
                                        
                                       }
                                    </Col>
                                    <Col md="4"></Col>
                                </Row>


                                <Row>
                                    <Col md="4"></Col>
                                    <Col>
                                        
                                       {
                                        transferrredInfo != '' ? 
                                        transferrredInfo.map((row, index)=>
                                            <div key={index}>
                                                <p>Transferred on: {row.date}</p>
                                                <p>Series: <Link  target="_blank" to={"/dts_bulk_transfer_print/" + row.series + '/' + row.by + '/' + formatDate(row.date)}  >{row.series} </Link></p>
                                               
                                            </div>
                                        ) : ''

                                       }
                                       <hr />
                                    </Col>
                                    <Col md="4">
                                        
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col></Col>
                                    <Col>
                                       { id != '' ? <DTSApproved id={id} />  : '' }
                                        
                                    </Col>
                                    <Col></Col>
                                </Row>

                               

                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default DTSMetaData