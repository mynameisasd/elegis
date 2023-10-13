import React, { useState, useEffect, useContext } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { ApiContext } from './App';
import GlobalNavigation from './global_components/GlobalNavigation';
import { Link } from 'react-router-dom';
import Transmittal_Details from './global_components/Transmittal_Details';
import Spinner from 'react-bootstrap/Spinner';
import Footer from './global_components/Footer';
import { AiFillFilePdf } from "react-icons/ai";
import { FiEdit3, FiUpload } from "react-icons/fi";




const columns = [
    {
        name: 'REFERENCE NO.',
        cell: (row) => (
            <div>
                <div  className='excerpts-ref-number'>
                    <Link target="_blank" to={"/excerpts_metadata/" + row.e_id} >{row.e_referenceNumber}</Link>
                </div>

                <div style={{'text-align':'left'}}>
                    <span className='excerpts-action'>ACTIONS:</span>
                </div>
                <Button style={{'width':'100%', 'margin-bottom' :'5px', 'font-size':'12px', 'text-align':'left' , 'border-radius':'0' }} variant="success" size="sm"><Link  className='link-style' to={"/upload_excerpts/" + row.e_id + "/" + row.e_referenceNumber }>< FiUpload/></Link></Button>
                <br/>   
                <Button style={{'width':'100%', 'font-size':'12px', 'text-align':'left', 'border-radius':'0' }} variant="info" size="sm" ><Link  className='link-style' to={"/edit_excerpts/" + row.e_id }><FiEdit3 /></Link></Button>
                <br/> 
                <br />  
            </div>
        ),
        sortable: true,
        width:'150px'
    },
    {
        name: 'TITLE',
        selector: row => row.e_title ,
        sortable: true,
        width:'700px',
        wrap:true,
        style:{'text-align':'justify'}
       
    },
    
    {
        name: 'ADOPTED',
        selector: row => row.e_dateAdopted,
        sortable: true,
        width:'150px'
    },
    {
        name: 'APPROVED',
        style:{'text-align':'justify'}, 
        selector: row => <div>
                            {row.e_dateApproved ? row.e_dateApproved :
                             row.e_referenceNumber != '' ? <Transmittal_Details reference_number={row.e_referenceNumber}  />  : ''
                            }
                        </div>, 
        sortable: true,
        width:'150px'
    },
    {
        name: 'FILE',
        cell : (row) => (<a href={'http://192.168.0.106/excerpts/upload/' + row.e_fileLink} target="_blank">{row.e_fileLink}</a> ),
        sortable: true,
        width:'100px'
    },
   
];


const Excerpts = () => {

    const api = useContext(ApiContext)
    const [ excerpts, setExcerpts ] = useState([{}])
    const [ searchType, setSearchType ] = useState('e_title')
    const [ search, setSearch  ] = useState('')
    const [ loader, setLoader ] = useState(true)



    
    useEffect(()=>{

        axios.post( api.excerpts + 'get_excerpts.php')
        .then(function (response) {
    
        setExcerpts(response.data);

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

            <br />
            <Container >
                <div className='excerpts_search custom-shadow'>
                    <h4 className='text-left'> <AiFillFilePdf style={{color:'red'}} /> RESOLUTIONS/ORDINANCES ARCHIVE</h4>
                    <hr />
                    <Row>
                        <Col md="4">
                            <Form.Select className='custom-textbox' onChange={handleSearchType} aria-label="Default select example">
                                <option value="e_title">TITLE</option>
                                <option value="e_referenceNumber">REFERENCE NO.</option>
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
                <Row >
                    <Col>  
                            {
                                loader ? <div>
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                         </div>
                                :   <DataTable
                                        className='custom-shadow'
                                        columns={columns}
                                        data={excerpts}
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
            <br />

            {
                loader ? <div>
                            
                            </div>
                :   
                            <Footer />
            }
            
        </div>
    )
}

export default Excerpts;