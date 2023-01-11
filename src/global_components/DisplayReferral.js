import react, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ApiContext } from '../App'
import { ListGroup } from 'react-bootstrap'
import { AiTwotonePushpin } from "react-icons/ai";


const DisplayReferral = ( committee_id ) => {

    const api = useContext(ApiContext)
    const [ commTitle, setCommTitle ] = useState('')

    axios.post( api.dts + 'get_referral_by_dts_id.php', committee_id )
    .then(function (response) {

        let new_data = response.data
        setCommTitle(new_data[0]['committee'])

    })

    return (
        <div>
           <ListGroup>
                <ListGroup.Item>{commTitle}  <AiTwotonePushpin style={{'float':'right', 'font-size':'20px'}} /></ListGroup.Item>
            </ListGroup>
           
        </div>
    )
}

export default DisplayReferral