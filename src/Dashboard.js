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
            <br />
            <br />
            <br />
            <br />
            <br />
            <Container>
                <Row>
                    <Col md="4"></Col>
                    <Col md="4">
                        <Card style={{ width: '18rem' }}>
                            {/* <Card.Img variant="top" src="https://img.freepik.com/premium-vector/wooden-gavel-judge-auctioneer-concept-auction-justice-isolated-vector-illustration_108855-3350.jpg?w=2000" /> */}
                            <Card.Body>
                               
                                <span style={{"color":"skyblue","font-size":"bolder"}}>E-Legis</span>
                                <br />
                                <Card.Title><strong>CHOOSE SYSTEM</strong></Card.Title>
                                <hr />
                                <Form.Group className="mb-3">
                                    <Button size="sm" variant="success">EXCERPTS</Button>
                                    <br /> 
                                    <br />
                                    <Button size="sm" variant="success">DOCUMENT TRACKING</Button>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="4"></Col>
                </Row>
            </Container>


        </div>
    )
}

export default Dashboard