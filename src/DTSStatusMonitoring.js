import React, { useState, useEffect, useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { ApiContext } from './App'
import Spinner from 'react-bootstrap/Spinner';



const DTSStatusMonitoring = () =>{

    const [ status, setStatus ] = useState()

    const api = useContext(ApiContext)

    useEffect(()=>{ 

        axios.post( api.dts + 'get_action_status.php',)
        .then(function (response) {
    
            setStatus(response.data)

        })

    },[])

    return (
        <div style={{'border':'1px solid #eee', 'padding':'15px'}}>
            <Row>
                <Col>
                    <h2>
                        { status ? status[0]['active_count'] 
                        : <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> 
                        }
                    </h2>
                    <p>Active</p>
                </Col>
                <Col>
                    <h2>
                        { status ? status[0]['acted_count'] : 
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> 
                        }
                    </h2>
                    <p>Acted</p>
                </Col>
                <Col>
                    <h2>
                        { status ?  status[0]['transferred_count'] 
                        :  <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> 
                         }
                    </h2>
                    <p>
                        Acted and Transferred
                    </p>
                </Col>
            </Row>
        </div>
    )
}


export default DTSStatusMonitoring
