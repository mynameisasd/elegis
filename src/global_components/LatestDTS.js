import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { ApiContext } from '../App'

const LatestDTS = () => {

    const api = useContext(ApiContext)
    const [ latest, setLatest ] = useState([{}])

    useEffect(()=> {

        axios.post( api.dts + 'get_latest_dts.php')
        .then(function (response) {
    
        setLatest(response.data);        

        })

    },[])


    return (
        <h6 style={{'color':'red', 'text-align':'left'}}>Latest DTS No. Available: <strong>{parseInt(latest[0]['dts']) + 1}</strong></h6>
    )
}

export default LatestDTS