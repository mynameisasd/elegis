import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ApiContext } from './App'
import { useParams } from 'react-router-dom'
import DisplayExcerptTitle from './global_components/DisplayExcerptTitle'


const PrintTransmittalExcerpts = () => {

    const { series } = useParams()
    const api = useContext(ApiContext)
    const [ info, setInfo ] = useState([{}])
    const [ generalInfo, setGeneralInfo ] = useState([{}])
    const [ count, setCount ] = useState(0)

    useEffect(()=>{

        let data = {
            series: series
        }
        axios.post( api.excerpts + 'get_transferred_by_series.php', data)
        .then(function (response) {

            setInfo(response.data)
            setGeneralInfo(response.data[0])

            let count = Object.keys(response.data).length

           setCount(count)
        })
        

    },[])

    return (
        <div>
            <table width="100%">
                <tr>    
                    <th>
                        <img width="100px" src={api.dts + '/img/taytaylogo.png' } />
                    </th>
                    <th> 
                        <small>Republic of the Philippines</small><br/>
                        <small>MUNICIPALITY OF TAYTAY</small><br/>
                        <small>Province of Palawan</small>
                        <br/>
                        <br/>
                        <h6>OFFICE OF THE SECRETARY TO THE SANGGUNIAN</h6>
                    </th>
                    <th>
                        <img width="100px" src={api.dts + '/img/SBLOGO2019.png' } />
                    </th>
                </tr>
            </table>
        <br/>
        <div style={{'text-align':'left'}}>
            <small style={{'font-size':'12px'}}>{ generalInfo['date'] }</small><br/>
            <small style={{'font-size':'12px'}}><strong>{ generalInfo['office'] == 'mayors' ? 'HON. CHRISTIAN V. RODRIGUEZ' : 'Sharmaine C. Tojon' }</strong></small><br/>
            <small style={{'font-size':'12px'}}>{ generalInfo['office'] == 'mayors' ? 'Municipal Mayor' : 'Records Officer I' }</small><br/>
            <small style={{'font-size':'12px'}}>{ generalInfo['office'] == 'mayors' ? 'This Municipality' : '' }</small><br/>
            <br/>
        
            <small style={{'font-size':'12px'}}>  { generalInfo['office'] == 'mayors' ? 'Dear Hon. Mayor;' : 'Dear Madam;' }</small><br/>
            <br/>

            <small style={{"text-align":'justify','font-size':'12px'}}>Respectfully forwarding herewith { generalInfo['type'] } of documents, properly described in detail below, acted by the local Sanggunian in its Regular Session conducted at Session Hall, Legislative Buidling, Barangay Poblacion. Taytay, Palawan.</small><br/>
        </div>

        <br />  
        <table style={{'width':'100%'}}>
            <tr style={{"border-bottom":'1px solid black'}}>
                <th width="20%">Ref No.</th>
                <th width="60%">Title</th>
                <th width="20%">Remarks</th>
            </tr>

            {

                info.map((row, index)=>
                    <tr key={index} style={{'border-bottom':'1px solid black'}}>
                        <td><small style={{'font-size':'12px'}}>{row['excerpt_number']}</small></td>
                        <td style={{'text-align':'justify','font-size':'12px'}}><small><DisplayExcerptTitle refNum={row['excerpt_number']} /></small></td>
                        <td></td>
                    </tr>
                )

            }
            
        </table>
        <br/>
        <div style={{"text-align":'left'}}>
            <small style={{'font-size':'12px'}}>Total Number of Documents: {count}</small><br/>
            <small style={{'font-size':'12px'}}>For your information, guidance and/or action</small><br/>
            <br />
            <small style={{'font-size':'12px'}}>Kindly acknowledge receipt hereof</small><br/>
            <small style={{'font-size':'12px'}}>Respectfully yours,</small><br/>
            <br />
            <br />
            <small style={{'font-size':'12px'}}><strong>ANTONIA A. GONZALES</strong></small><br />
            <small style={{'font-size':'12px'}}>Secretary to the Sanggunian</small>
            <br/>
            <br/>
            <br/>
            <small style={{'font-size':'12px'}}>Series Transfer No. {series}</small>
        </div>
        </div>
    )
}

export default PrintTransmittalExcerpts