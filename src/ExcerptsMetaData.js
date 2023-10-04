import react, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { Container, Row, Col, Dropdown, Tab, Tabs, Table } from 'react-bootstrap'
import axios from 'axios'
import { useContext } from "react"
import { ApiContext } from "./App"
import { Link } from 'react-router-dom'
import SourceFileExcerpts from './global_components/SourceFileExcerpts'
import ExcerptMovement from './global_components/ExcerptMovement'
import Transmittal_Details from './global_components/Transmittal_Details'

const ExcerptsMetaData = () => {

    const api = useContext(ApiContext)
    const { id } = useParams()
    const [ metadata, setMetadata ] = useState([{}])
    const [ source, setSource ] = useState(0)
    const [ forwardedExcerpts, setForwardedExcerpts ] = useState([{}]) 
    const x = 0

    useEffect( ()=> {

        let data = {
            'id': id
        }

        axios.post( api.excerpts + 'get_excerpt_using_id.php', data )
        .then(function (response) {
    
            setMetadata(response.data)
           
        })

        

    },[])
    
    useEffect(()=> {

        //get source file
        let parent_id = {
            'parent_id': id
        }
    
        axios.post( api.excerpts + 'get_source_file.php', parent_id )
        .then(function (response) {
            
            let data = response.data
            setSource(data[0]['file'])
           
        })

        axios.post( api.excerpts + 'get_forwarded_excerpts.php', parent_id )
        .then(function (response) {
            
            setForwardedExcerpts(response.data)
            console.log(response.date)
           
        })


    },[])

   

    return (
        <div>
            <Container style={{margin: '0 auto', padding: '0', background: 'white'}}>
                <h1 className="excerpts-metadata-title">EXCERPTS METADATA</h1>
                <Row style={{margin:'0', padding: '0'}}>
                    <Col>
                        <div style={{'float':'right'}}>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    ACTIONS
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item ><Link to={'/excerpts_source/' + id + '/' + metadata[0]['e_referenceNumber']}>Source File</Link></Dropdown.Item>
                                    <Dropdown.Item ><Link to={'/excerpts_forward/' + id }>Add Movement</Link></Dropdown.Item>
                                    </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
                <br />
                <Row style={{margin:'0', padding: '0'}}>
                    <Col md="11">
                        <Row>
                            <Col md="2" className='text-left'>
                                REFERENCE NUMBER:
                            </Col>
                            <Col md="10" className='text-left'>
                                <strong>
                                    { metadata[0]['e_referenceNumber'] }
                                </strong>
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col md="2" className='text-left'>
                                TITLE:
                            </Col>
                            <Col md="10" className='text-left'>
                                <strong>
                                    { metadata[0]['e_title']}
                                </strong>
                            
                            </Col>
                        </Row>
                    </Col>
                    <Col md="1">
                        <img style={{'width':'100%'}} alt="logo" src={api.dts + "/img/SBLOGO2019.png"} />
                    </Col>
                </Row>

                <hr />

                <Row style={{
                        'background': '#eee',
                        'padding': '15px 0 15px 0',
                        'margin': '0'

                }}>
                    <Col md="4">
                        
                        <Row>
                            <Col md="4" className='text-right'>
                                YEAR:
                            </Col>
                            <Col md="8" className='text-left'>
                                {
                                    metadata[0]['e_year']
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4"  className='text-right'>
                                AUTHOR/S:
                            </Col>
                            <Col md="8" className='text-left'>
                                {
                                    metadata[0]['e_authors']
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4"  className='text-right'>
                                SPONSOR/S:
                            </Col>
                            <Col md="8" className='text-left'>
                                {
                                    metadata[0]['e_sponsors']
                                }
                            </Col>
                        </Row>

                    </Col>
                    <Col md="4">

                        <Row>
                            <Col md="4" className='text-right'>
                                CERTIFIED BY:
                            </Col>
                            <Col md="8" className='text-left'>
                                {
                                    metadata[0]['e_certifiedBy']
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4"  className='text-right'>
                                ATTESTED:
                            </Col>
                            <Col md="8" className='text-left'>
                                {
                                    metadata[0]['e_attested']
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4"  className='text-right'>
                                APPROVED BY:
                            </Col>
                            <Col md="8" className='text-left'>
                                {
                                    metadata[0]['e_approved']
                                }
                            </Col>
                        </Row>

                    </Col>
                    <Col md="4">
                                

                    <Row>
                        <Col md="4" className='text-right'>
                                DATE ADOPTED:
                            </Col>
                            <Col md="8" className='text-left'>
                                {
                                    metadata[0]['e_dateAdopted']
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4"  className='text-right'>
                                DATE APPROVED:
                            </Col>
                            <Col md="8" className='text-left'>
                                {
                                    metadata[0]['e_dateApproved']
                                }
                            </Col>
                        </Row>
                       
                    </Col>
                </Row>
                <br />
                <Row style={{margin:'0', padding: '0'}}>
                    <Col>
                        <Tabs
                            defaultActiveKey="home"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                            >
                            <Tab eventKey="home" title="Source File">
                                
                                { source == '' ?  <small><img style={{'width': '150px'}} alt="loading image" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bc72fcb6-787f-489d-8764-fce01bf45ffb/d22hq47-51f6aeb9-27df-46c5-8a16-a64e25edaa79.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JjNzJmY2I2LTc4N2YtNDg5ZC04NzY0LWZjZTAxYmY0NWZmYlwvZDIyaHE0Ny01MWY2YWViOS0yN2RmLTQ2YzUtOGExNi1hNjRlMjVlZGFhNzkuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.EoggLOOb5EEsIUWrpfR4yl-4NyUVZMeWc039QjunKTg" / ></small> : <SourceFileExcerpts id={source} /> }
                                
                            </Tab>
                            <Tab eventKey="profile" title="Movements">


                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                        <th>Date</th>
                                        <th>Forwarded to</th>
                                        <th>No. of Copy/Copies</th>
                                        <th>Remarks</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {

                                            forwardedExcerpts != '' ? 

                                            forwardedExcerpts.map((info, index) => (
                                                <tr key={index}>
                                                    <td>{info.date}</td>
                                                    <td>{info.forwarded_to}</td>
                                                    <td>{info.number_of_copy}</td>
                                                    <td>{info.reason}</td>
                                                    <td></td>
                                                </tr> 
                                              ))
                                        
                                            : ''
                                        }
                                        
                                        
                                    </tbody>
                                    </Table>
                                    
                              
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
                
            <br/>
            </Container>
            
        </div>
    )
}


export default ExcerptsMetaData