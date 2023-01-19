import react, { useContext, useEffect, useState } from 'react'
import { ApiContext } from './App'
import GlobalNavigation from './global_components/GlobalNavigation'
import axios from 'axios'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'


const Dashboard = () => {
    
    const api = useContext(ApiContext)
    const [ year, setYear ] = useState([{}])
    

    //excerpts connectect
    useEffect(()=>{
        
        //get years distinct
        axios.post( api.excerpts + 'get_year_distinct.php',  )
        .then(function (response) {
    
           setYear(response.data)

        })


    },[])

    function handleYearChange(e){

        console.log(e.target.value)

    }

    return (


        <div>
            <GlobalNavigation />

            <Container>
                <Row>
                    <Col md="4">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://img.freepik.com/premium-vector/wooden-gavel-judge-auctioneer-concept-auction-justice-isolated-vector-illustration_108855-3350.jpg?w=2000" />
                            <Card.Body>
                                <Card.Title><strong>RESOLUTION</strong></Card.Title>

                                    <Form.Group className="mb-3">
                                    <Form.Label>Year</Form.Label>
                                    <Form.Select onChange={handleYearChange} >
                                        
                                        {
                                            year.map((row, index)=>
                                                <option key={index}>{row.e_year}</option>
                                            )
                                        }

                                    </Form.Select>

                                </Form.Group>
                                <h2>90</h2>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>


        </div>
    )
}

export default Dashboard