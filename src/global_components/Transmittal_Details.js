import React, { useState, useEffect, useContext } from 'react'
import { ApiContext } from '../App'
import axios from 'axios'


const Transmittal_Details = ( { reference_number } ) => {
    
    const api = useContext(ApiContext)
    const [ count, setCount ] = useState({
        date_submitted: '',
        days_passed: ''
    })



   
    useEffect( ()=> {

        let data = {
            ref_number: reference_number
        }

        
        axios.post( api.excerpts + 'get_transmitted_days_passed.php', data )
        .then(function (response) {

            let info = response.data
            
            setCount(info[0])

        })


    }, [reference_number])
    
  

    return (
        <div> 
            {
                count   ? 
                <div style={{'text-align': 'left', 'font-size': '12px', 'color': 'red' }}>
                    {/* Transmitted on: <br/>{count['date_submitted']}
                    <br /> */}
                    Days passed: {count['days_passed']}
                    
                </div>
                : ''
            }
            

        </div>
    )

}

export default Transmittal_Details