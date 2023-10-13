import React, { useState, useEffect, useContext } from 'react'
import GlobalNavigation from './global_components/GlobalNavigation'
import { Container, Row, Col, Form, Card, Button }  from 'react-bootstrap' 
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import axios from 'axios'
import { ApiContext } from './App';
import { set, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';



const TransferExcerpts = () => {

    const navigate = useNavigate()
    const currentDate = new Date().getFullYear()  //get the current date

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const api = useContext(ApiContext)  
    const animatedComponents = makeAnimated();
    const [ transferExcerpts, setTransferExcerpts ] = useState([{}]) 
    const [ refNumber, setRefNumber ] = useState([{}])
    const [ year, setYear ] = useState([{}])


    const handleRefNumber = (selectedOptions) => {

       setTransferExcerpts(selectedOptions)

    }

    const handleYearChange = (e) => {

        reloadRefNumber(e.target.value)

    }

    useEffect(()=>{

        //get all reference Number
        let data = {
            year: currentDate
        }

        axios.post( api.excerpts + 'get_all_reference_number.php', data )
        .then(function (response) {

          setRefNumber(response.data)
         
         
        })

        // get year

        axios.post( api.excerpts + 'get_year_distinct.php', )
        .then(function (response) {

          setYear(response.data)
         
        })
        
    },[])

    //reload the ref when year is change
    const reloadRefNumber = (_year) => {

        let data = {
            year: _year
        }

        axios.post( api.excerpts + 'get_all_reference_number.php', data )
        .then(function (response) {

          setRefNumber(response.data)
         
        })

    }


    //submit the form       
    const onSubmit = (data) => {

        let new_data = {
            reference_numbers: transferExcerpts,
            info : data
        }

        axios.post( api.excerpts + 'transfer_excerpts.php', new_data )
        .then(function (response) {
          
            navigate("/print_transmittal_excerpts/" + response.data)
         
        })

    }

    return (
        <div>
            <GlobalNavigation />

            <Container>
                <h1>TRANSFER EXCERPTS</h1>
                <br/>
                <br/>

                <Row>
                    <Col md="6">
                        <Card className='custom-shadow' style={{border:'none', 'text-align':'left', borderRadius:'0'}}>
                            <Card.Body>
                            <h2>Choose to transmit:</h2>
                            <hr />
                            <Form.Label>EXCERPT YEAR:</Form.Label>
                            <Form.Select className='custom-textbox' aria-label="Default select example"  onChange={handleYearChange} >
                                {
                                    year.map((info, index) =>
                                    <option key={index} value={info['e_year']}>{info['e_year']}</option>
                                    )
                                }
                            </Form.Select>
                            <br />
                            <br />  
                            REFERENCE NO.:
                            <Select
                                className='custom-textbox'
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isSearchable={true}
                                isMulti
                                options={refNumber}
                                onChange={handleRefNumber}
                            />

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="6">
                    <Card className='custom-shadow' style={{border: "none", textAlign:'left', borderRadius:'0'}}>
                        <Card.Body>
                            <h2>Transmit to:  </h2>
                            <hr />
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <Form.Label>TO</Form.Label> 
                                <Form.Select className='custom-textbox' aria-label="Default select example"  {...register("transfer_to")} >
                                    <option value="mayors">Mayors Office</option>
                                    <option value="records">Records Office</option>
                                </Form.Select>
                                <br />
                                <Form.Group className="mb-3" controlId="date_adopted">
                                    <Form.Label>DATE</Form.Label>
                                    <Form.Control className='custom-textbox' type="date" placeholder="Date Adopted" {...register("date")}  required />
                                </Form.Group>
                                <br />

                                <Form.Label>TRANSFER BY</Form.Label> 
                                <Form.Select className='custom-textbox' aria-label="Default select example"  {...register("transfer_by")} >
                                    <option value="Antonia A. Gonzales">Antonia A. Gonzales</option>
                                    <option value="Mark Lawrence H. Pleyo">Mark Lawrence H. Pleyto</option>
                                    <option value="Sharmain C. Tojon">Sharmaine C. Tojon</option>
                                </Form.Select>
                                <br />

                                <Form.Label>TYPE</Form.Label> 
                                <Form.Select className='custom-textbox' aria-label="Default select example"  {...register("type")} >
                                    <option value="original copy">Original Copy</option>
                                    <option value="e-copy">E-Copy</option>
                                </Form.Select>
                                <br />
                                <Button className='custom-button' variant='success' type="submit">
                                    Submit
                                </Button>
                            </form>
                            

                        </Card.Body>
                    </Card>

                        
                    </Col>
                </Row>
                
            </Container>
        </div>
    
        )
}

export default TransferExcerpts