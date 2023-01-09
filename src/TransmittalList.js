import React from 'react'
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import GlobalNavigation from './global_components/GlobalNavigation'

const TransmittalList = () => {
    return (
        <div>
            <GlobalNavigation />
            <h1>Transmittal List</h1>
            <br />
            <Container>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
            </Container>
            
        </div>
    )
}

export default TransmittalList