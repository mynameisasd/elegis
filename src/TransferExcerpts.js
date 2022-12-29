import React, { useState, useEffect, useContext } from 'react'
import GlobalNavigation from './global_components/GlobalNavigation'
import { Container, Row, Col, Form }  from 'react-bootstrap' 
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import axios from 'axios'
import { ApiContext } from './App';


const TransferExcerpts = () => {

    const currentDate = new Date().getFullYear()  //get the current date

    const api = useContext(ApiContext)  
    const animatedComponents = makeAnimated();
    const [ transferExcerpts, setTransferExcerpts ] = useState([{}]) 
    const [ refNumber, setRefNumber ] = useState([{}])
    const [ year, setYear ] = useState([{}])


    const handleRefNumber = (selectedOptions) => {
        console.log(selectedOptions)
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

    return (
        <div>
            <GlobalNavigation />

            <Container>
                <h1>Transfer Excerpts</h1>
                <br/>
                <br/>

                <Row>
                    <Col md="6">
                        Year
                        <Form.Select aria-label="Default select example"  onChange={handleYearChange} >
                            {
                                year.map((info) =>
                                <option value={info['e_year']}>{info['e_year']}</option>
                              )
                            }
                        </Form.Select>
                        <br />
                        <br />  
                        Reference No.:
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isSearchable={true}
                            isMulti
                            options={refNumber}
                            onChange={handleRefNumber}
                        />
                    </Col>
                </Row>
                
            </Container>
        </div>
    
        )
}

export default TransferExcerpts