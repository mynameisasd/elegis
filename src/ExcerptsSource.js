import react, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiContext } from './App'
import axios from 'axios'
import Select from 'react-select'
import { Container, Row, Col, Button } from 'react-bootstrap'


const ExcerptsSource = () => {

    const { id, reference_number } = useParams()
    const api = useContext(ApiContext)
    const [ dts, setDTs ] = useState([{}])
    const [ source, setSource ] = useState('')
    const navigate = useNavigate()

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

    useEffect(()=>{

        axios.post( api.dts + 'get_all_dts_number.php', )
        .then(function (response) {
    
            setDTs(response.data)
        })


    },[])


    function handleDtsChange(selectedOptions){

        let data = selectedOptions.value
        setSource(data)
        console.log(data)

    }

    function onSubmit(){
        
        let data = {
            'file' : source,
            'parent_id' : id
        }

        axios.post( api.dts + 'submit_source.php', data )
        .then(function (response) {
            
            navigate("/excerpts_metadata/" + id)
        
        })

    }
    return (
        <div>
            <br />
            <br />
            <Container>
                <h1>{reference_number}</h1>
                <hr />
                <Row>
                    <Col md="4"></Col>
                    <Col>
                        <Select onChange={handleDtsChange} options={dts} />
                        <br />
                        <Button variant="success" onClick={onSubmit} >Submit</Button>
                    </Col>
                    <Col md="4"></Col>
                </Row>
            </Container>
        </div>
    )
}

export default ExcerptsSource