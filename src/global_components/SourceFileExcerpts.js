import react, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ApiContext } from '../App'
import { Link } from 'react-router-dom'


const SourceFileExcerpts = ({ id }) => {

    const api = useContext(ApiContext)
    const  [ info, setInfo ] = useState([])

   

    
 
    useEffect(() => {
        
        const data = {
            'id': id
        }
        
        axios.post( api.dts + 'get_dts_info_using_id.php', data )
        .then(function (response) {

            setInfo(response.data)

        })

    },[id])
    


    return (
        <div>
            { 
                info.map((row, index) => <div key={index}><Link  target="_blank" to={"/dts_metadata/" + row.barcode + "/" + row.dts } > {row.barcode} </Link></div> ) 
            }
        </div>
    )
} 

export default SourceFileExcerpts