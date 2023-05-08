import React, { useContext, useEffect, useState} from 'react'
import { ApiContext } from '../App'
import axios from 'axios'


const ExcerptsAdopted = ({ref_number}) => {

    const api = useContext(ApiContext)
    const [ dateAdopted, setDateAdopted ] = useState({})

    useEffect( () => {

        let data = {
            ref_number: ref_number
        }

        axios.post( api.excerpts + 'get_dateAdopted.php', data )
        .then(function (response) {
            
            let data = response.data
          setDateAdopted(data[0])
          

        })



    },[ref_number])

    return (
        <small style={{'font-size': '12px'}}> {
                dateAdopted != '' ? 
                   dateAdopted['date_adopted']
                : ''
        } </small>
    )
}

export default ExcerptsAdopted