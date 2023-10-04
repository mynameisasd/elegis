import React, { useState, useContext, useEffect } from 'react'
import GlobalNavigation from './global_components/GlobalNavigation'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { ApiContext } from './App';
import Spinner from 'react-bootstrap/Spinner';
import { AiFillFilePdf } from "react-icons/ai";




import DocumentStatusStyle from './global_components/DocumentStatusStyle';
import DTSStatusMonitoring from './DTSStatusMonitoring';


const columns = [
    {
        name: 'FROM',
        cell : (row) => ( 
                            <div>
                                <small>
                                    <div style={{'padding':'10px'}}>
                                        <Button size="sm" onClick={()=>window.open('/elegis/dts_metadata/' + row.barcode + '/' + row.id,'_blank')} >{row.barcode}</Button>
                                    </div>
                                </small>
                              
                                <small>DTS: <strong style={{'color':'red'}}>{row.dts}</strong></small>
                                <br/>
                                <small>Date Received: <strong>{row.date_and_time}</strong></small>
                                <br/>
                                <small>From: <strong>{row.from}</strong></small>
                            </div> 
                        ),
        sortable: true,
        width:'250px',
        wrap:true,
        style:{'text-align':'justify'}
       
    },
    {
        name: 'SUBJECT',
        selector: row => row.subject ,
        sortable: true,
        width:'800px',
        wrap:true,
        style:{'text-align':'justify'}
       
    },
    {
        name: 'FILE',
        cell : (row) => ( <a href={'http://192.168.0.106/document_tracking/upload/' + row.file} target="_blank">{row.file}</a> ),
        sortable: true,
        width:'100px'
    },
    {
        name: 'STATUS',
        selector: (row) => <DocumentStatusStyle status={row.action_status} />,
        sortable: true,
        width:'100px'
    },
   
];


const DTSArchive = () => {


    
    const api = useContext(ApiContext)
    const [ dts, setDTS ] = useState([{}])
    const [ searchType, setSearchType ] = useState('dts')
    const [ search, setSearch  ] = useState('')
    const [ loader, setLoader ] = useState(true)

    
    useEffect(()=>{

        axios.post( api.dts + 'get_dts_document.php')
        .then(function (response) {
    
        setDTS(response.data);
        setLoader(false)

        })

    },[])


    function handleSearchType(e) {

        setSearchType(e.target.value)

       
    }
    
    function handleSearch(e){

        setSearch(e.target.value)

        if(e.target.value == '')
        {
            axios.post( api.dts + 'get_dts_document.php')
            .then(function (response) {
        
            setDTS(response.data);
    
            })
        }
 
     }

    function clickSearch(){

        let data = {
            'search_type':searchType,
            'search' : search

        }
        axios.post( api.dts + 'search_dts.php', data)
        .then(function (response) {
    
        setDTS(response.data);
        

        })

    }


    return (
        <div>
            <GlobalNavigation />
            {/* <Container>
                <Row>
                    <Col md="4">
                         <h1 style={{'text-align': 'left'}}> 
                            <span style={{'color':'red', 'font-weight':'bolder'}}>D</span>ocument
                        </h1>
                        <h1 style={{'text-align': 'left'}}> 
                        <span style={{'color':'red', 'font-weight':'bolder'}}>T</span>racking
                        </h1>
                        <h1 style={{'text-align': 'left'}}> 
                        <span style={{'color':'red', 'font-weight':'bolder'}}>S</span>ystem 
                        </h1>
                    </Col>
                    <Col md="8">
                        <DTSStatusMonitoring />
                    </Col>            
                </Row>
            </Container> */}
          
            <br />
            <Container>
                <div className='excerpts_search custom-shadow'>
                <h4 className='text-left'> <AiFillFilePdf style={{color: 'red'}} /> DOCUMENT TRACKING SYSTEM</h4>
                <hr />
                    <Row>
                        <Col md="4">
                            <Form.Select className='custom-textbox' onChange={handleSearchType} aria-label="Default select example">
                                <option value="dts">DTS NO.</option>
                                <option value="from">FROM</option>
                                <option value="subject">SUBJECT</option>
                            </Form.Select>
                        </Col>
                        <Col md="6">
                            <div>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Col sm="10">
                                <Form.Control 
                                    className='custom-textbox'
                                    type="text" 
                                    placeholder="Search" 
                                    onChange={handleSearch}
                                />
                                </Col>
                            </Form.Group>
                            </div> 
                        </Col>
                        <Col md="2">
                            <Button className='custom-button' variant="success " onClick={clickSearch}>Search</Button>
                        </Col>
                    </Row>
                </div>
                
                <br/>
                <Row>
                    <Col>

                        {
                            loader ?
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            
                            :
                            <DataTable
                                className='custom-shadow'
                                columns={columns}
                                data={dts}
                                pagination={true}
                                responsive={true}
                                striped={true}
                                highlightOnHover={true}
                                fixedHeader={true }
                            />
                        }
                       
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default DTSArchive