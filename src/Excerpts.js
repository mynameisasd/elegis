import React, { useState, useEffect, useContext } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { ApiContext } from './App';
import GlobalNavigation from './global_components/GlobalNavigation';
import { Link } from 'react-router-dom';


const columns = [
    {
        name: 'Reference No.',
        cell: (row) => (
            <div><Link target={"_blank"} to={"/excerpts_metadata/" + row.e_id} >{row.e_referenceNumber}</Link></div>
        ),
        sortable: true,
        width:'100px'
    },
    {
        name: 'Title',
        selector: row => row.e_title ,
        sortable: true,
        width:'800px',
        wrap:true,
        style:{'text-align':'justify'}
       
    },
    {
        name: 'File',
        cell : (row) => ( <a href={'http://192.168.0.106/excerpts/upload/' + row.e_fileLink} target="_blank">{row.e_fileLink}</a> ),
        sortable: true,
        width:'100px'
    },
    {
        name: 'Actions',
        cell: (row) => ( <div> 
                <Button style={{'width':'100%', 'margin-bottom' :'5px' }} variant="success" size="sm"><Link  className='link-style' to={"/upload_excerpts/" + row.e_id + "/" + row.e_referenceNumber }>UPLOAD</Link></Button>
                <br/>   
                <Button style={{width:'100%'}} variant="info" size="sm" ><Link  className='link-style' to={"/edit_excerpts/" + row.e_id }>EDIT</Link></Button>
                <br/>   
            </div>),
        sortable: true,
        width:'150px'
    },
    {
        name: 'Date Adopted',
        selector: row => row.e_dateAdopted,
        sortable: true,
        width:'100px'
    },
    {
        name: 'Date Approved',
        selector: row => row.e_dateApproved,
        sortable: true,
        width:'100px'
    },
];


const Excerpts = () => {

    const api = useContext(ApiContext)
    const [ excerpts, setExcerpts ] = useState([{}])
    const [ searchType, setSearchType ] = useState('e_title')
    const [ search, setSearch  ] = useState('')



    
    useEffect(()=>{

        axios.post( api.excerpts + 'get_excerpts.php')
        .then(function (response) {
    
        setExcerpts(response.data);

        })

    },[])


    function handleSearchType(e) {

        setSearchType(e.target.value)

       
    }
    
    function handleSearch(e){

        setSearch(e.target.value)

        if(e.target.value == '')
        {
            axios.post( api.excerpts + 'get_excerpts.php')
            .then(function (response) {
        
            setExcerpts(response.data);
    
            })
        }
 
     }

    function clickSearch(){

        let data = {
            'search_type':searchType,
            'search' : search

        }
        axios.post( api.excerpts + 'search_excerpts.php', data)
        .then(function (response) {
    
        setExcerpts(response.data);
        

        })

    }




    return (

        <div>
            <GlobalNavigation />

            <h1 style={{'text-align' : 'center'}}> <img alt="image" style={{'width':'200px'}} src="https://static.vecteezy.com/system/resources/previews/008/292/833/non_2x/contract-documents-documents-with-paper-sheets-signatures-and-sticky-notes-employment-business-and-finance-hiring-cartoon-illustration-isolate-on-a-white-background-vector.jpg" />EXCERPTS ARCHIVE</h1>
            <br />
            <br />
            <Container>
                <Row>
                    <Col md="4">
                        <Form.Select onChange={handleSearchType} aria-label="Default select example">
                            <option value="e_title">Title</option>
                            <option value="e_referenceNumber">Reference Number</option>
                            <option value="e_excerpts">Excerpt Type</option>
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
                            data={excerpts}
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

export default Excerpts;