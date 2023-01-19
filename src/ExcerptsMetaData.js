import react, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { Container, Row, Col, Dropdown, Tab, Tabs } from 'react-bootstrap'
import axios from 'axios'
import { useContext } from "react"
import { ApiContext } from "./App"
import { Link } from 'react-router-dom'
import SourceFileExcerpts from './global_components/SourceFileExcerts'

const ExcerptsMetaData = () => {

    const api = useContext(ApiContext)
    const { id } = useParams()
    const [ metadata, setMetadata ] = useState([{}])
    const [ source, setSource ] = useState([{}])

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
    
            setSource(response.data)
           
        })


    },[])

    return (
        <div>
            <Container>
                <h1 className="excerpts-metadata-title">EXCERPTS METADATA</h1>
                <Row>
                    <Col>
                        <div style={{'float':'right'}}>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    ACTIONS
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item ><Link to={'/excerpts_source/' + id + '/' + metadata[0]['e_referenceNumber']}>Source File</Link></Dropdown.Item>
                                    <Dropdown.Item >Add Movement</Dropdown.Item>
                                    </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md="11">
                        <Row>
                            <Col md="2" className='text-left'>
                                REFERENCE NUMBER:
                            </Col>
                            <Col md="10" className='text-left'>
                                <strong>
                                    { metadata[0]['e_referenceNumber']}
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
                        'padding': '15px',
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
                <Row>
                    <Col>
                        <Tabs
                            defaultActiveKey="home"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                            >
                            <Tab eventKey="home" title="Source File">

                                <SourceFileExcerpts id={source} />
                                
                            </Tab>
                            <Tab eventKey="profile" title="Movements">
                               
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>

            </Container>
            
        </div>
    )
}


export default ExcerptsMetaData