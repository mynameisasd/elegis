import react, { useContext, useEffect, useRef, useState } from 'react'
import { ApiContext } from '../App'
import axios from 'axios' 


const DisplayExcerptTitle = ({refNum}) => { 

    const api = useContext(ApiContext)
    const [ title, setTitle ] = useState('') 



    if (refNum != '') {

        let data = {
            'refNum' : refNum
        }
        axios.post( api.excerpts + 'get_excerpt_using_reference_number.php', data )
        .then(function (response) {
    
            setTitle(response.data[0]['e_title']);
            console.log(response.data)
            
        })
        
    }



    

    
  
  
    return (
        <small>{ title }</small>
    )
}

export default DisplayExcerptTitle