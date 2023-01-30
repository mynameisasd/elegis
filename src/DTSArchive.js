import React, { useState, useContext, useEffect } from 'react'
import GlobalNavigation from './global_components/GlobalNavigation'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { ApiContext } from './App';


import DocumentStatusStyle from './global_components/DocumentStatusStyle';


const columns = [
    {
        name: 'DTS and Barcode',
        cell:(row) => ( <div style={{padding:'15px'}}><Button size="sm" onClick={()=>window.open('/dts_metadata/' + row.barcode + '/' + row.id,'_blank')} >{row.barcode}</Button><br/><strong>DTS:</strong> { row.dts }</div>),
        sortable: true,
        width:'250px'
    },
    {
        name: 'Subject',
        selector: row => row.subject ,
        sortable: true,
        width:'800px',
        wrap:true,
        style:{'text-align':'justify'}
       
    },
    {
        name: 'File',
        cell : (row) => ( <a href={'http://192.168.0.106/document_tracking/upload/' + row.file} target="_blank">{row.file}</a> ),
        sortable: true,
        width:'100px'
    },
    {
        name: 'Action Status',
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

    
    useEffect(()=>{

        axios.post( api.dts + 'get_dts_document.php')
        .then(function (response) {
    
        setDTS(response.data);

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
            <h1> <img alt="image" style={{'width':'200px'}} src="https://static.vecteezy.com/system/resources/previews/008/292/833/non_2x/contract-documents-documents-with-paper-sheets-signatures-and-sticky-notes-employment-business-and-finance-hiring-cartoon-illustration-isolate-on-a-white-background-vector.jpg" /> DOCUMENT TRACKING SYSTEM</h1>
            <br />
            <br />
            <Container>
                <Row>
                    <Col md="4">
                        <Form.Select onChange={handleSearchType} aria-label="Default select example">
                            <option value="dts">DTS No.</option>
                            <option value="subject">Subject</option>
                        </Form.Select>
                    </Col>
                    <Col md="6">
                        <div>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                            Search
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control 
                                type="text" 
                                placeholder="Search" 
                                onChange={handleSearch}
                            />
                            </Col>
                        </Form.Group>
                        </div> 
                    </Col>
                    <Col md="2">
                        <Button variant="success " onClick={clickSearch}>Search</Button>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <DataTable
                            columns={columns}
                            data={dts}
                            pagination={true}
                            responsive={true}
                            striped={true}
                            highlightOnHover={true}
                            fixedHeader={true }
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default DTSArchive