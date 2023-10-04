import React, { useState, useEffect, useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { ApiContext } from './App'
import Spinner from 'react-bootstrap/Spinner';
import { AiFillMinusCircle, AiFillRead } from "react-icons/ai";



const DTSStatusMonitoring = () =>{

    const [ status, setStatus ] = useState()
    const [ CR, setCR ] = useState(0)
    const [ documentType, setDocumentType ] = useState([{}])

    const api = useContext(ApiContext)

    useEffect(()=>{ 

        axios.post( api.dts + 'get_action_status.php',)
        .then(function (response) {
    
            setStatus(response.data)

        })


        axios.post( api.dts + 'get_committee_report.php',)
        .then(function (response) {
    
            setCR(response.data)

        })

        axios.post( api.dts + 'get_count_document_types.php',)
        .then(function (response) {
    
            setDocumentType(response.data)

        })

    },[])

    return (
        <div style={{'border':'1px solid #eee', 'padding':'15px'}}>
            <Row>
                
                <Col>
                    <small><AiFillMinusCircle style={{'color':'red'}} /> ACTIVE</small>
                    <h5 style={{'font-weight' : 'bolder'}}>
                        { status ? status[0]['active_count'] 
                        : <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> 
                        }
                    </h5>
                    
                </Col>
                <Col>
                    <small><AiFillMinusCircle style={{'color':'green'}} /> ACTED</small>
                    <h5 style={{'font-weight' : 'bolder'}}>
                        { status ? status[0 ]['acted_count'] : 
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> 
                        }
                    </h5>
                    
                </Col>
                <Col>
                    <small style={{'text-align': 'left'}}>
                    <AiFillMinusCircle style={{'color':'skyblue'}} /> TRANSFERRED TO RECORDS
                    </small>
                    <h5 style={{'font-weight' : 'bolder'}}>
                        { status ?  status[0]['transferred_count'] 
                        :  <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> 
                         }
                    </h5>
                    
                </Col>
                
            </Row>
            <hr />
            {/* <Row>
                <Col>
                    <small style={{'text-align': 'left'}}> <AiFillRead style={{'color':'green', 'font-size':'17px'}} />Supplemental</small>
                    <h5 style={{'font-weight' : 'bolder'}}>
                        { CR ? documentType[0]['Supplemental'] 
                        : <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                         </Spinner> 
                        }
                    </h5>
                </Col>
                <Col>
                    <small style={{'text-align': 'left'}}> <AiFillRead style={{'color':'green', 'font-size':'17px'}} />Barangay Annual Budget</small>
                        <h5 style={{'font-weight' : 'bolder'}}>
                            { CR ? documentType[0]['Barangay_Budget'] 
                            : <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                            </Spinner> 
                            }
                    </h5>
                </Col>
                <Col>
                    <small style={{'text-align': 'left'}}> <AiFillRead style={{'color':'green', 'font-size':'17px'}} />SK Annual Budget</small>
                        <h5 style={{'font-weight' : 'bolder'}}>
                            { CR ? documentType[0]['SK_Budget'] 
                            : <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                            </Spinner> 
                            }
                    </h5>
                </Col>
            </Row> */}
        </div>
    )
}


export default DTSStatusMonitoring
