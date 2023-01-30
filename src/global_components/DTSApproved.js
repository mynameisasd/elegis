import react, { useContext, useEffect , useState} from 'react'
import axios from 'axios'
import { ApiContext } from '../App'


const DTSApproved = ({id}) => {

    const api = useContext(ApiContext)


    return (
        <div><h1>DTS Approved</h1> {id}</div>

    )
} 

export default DTSApproved