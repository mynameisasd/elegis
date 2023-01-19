import react, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ApiContext } from '../App'
import { Link } from 'react-router-dom'


const SourceFileExcerpts = ({ id }) => {

    const api = useContext(ApiContext)
    const  [ info, setInfo ] = useState([{}])
    

    useEffect(()=>{

       
        // axios.post( api.dts + 'get_dts_info_using_id.php', id )
        // .then(function (response) {
    
        //     setInfo(response.data)
        //     console.log(response.data)
    
        // })
        console.log(id)
    
    },[])

   

    return (
        <div>
         
            {/* <Link target={"_blank"}  to={"/dts_metadata/" + info[0]['barcode'] + '/' + info[0]['id']} >{ info[0]['dts'] }</Link> */}
        </div>
    )
} 

export default SourceFileExcerpts