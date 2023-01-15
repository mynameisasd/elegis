import react, { useContext, useEffect, useState } from 'react'
import { ApiContext } from './App'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const DTSPrintBulkTransfer = (  ) => {

    const { series, transferred_by, date } = useParams()
    const [ tranmittedDTS, setTransmittedDTS ] = useState([{}])
    const [ count, setCount ] = useState(0)
    const api = useContext(ApiContext)

    useEffect(()=>{

        let data = {
            'series': series
        }
        axios.post( api.dts + 'get_transmitted_dts.php', data )
        .then(function (response) {
    
            console.log(response.data)
            setTransmittedDTS(response.data)

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
            <p style={{'font-size':'12px', 'text-align':'left'}}>Respectfully transmitting herewith documents for REPORDS KEEPING</p>
            <p style={{'font-size':'12px', 'text-align':'left'}}>DATE OF TRANSFER: {date}</p>
            <br/> 

            <table width="100%" >
                <tr style={{'border-bottom':'1px solid black'}}>
                    <th> Ref #</th>
                    <th> Barcode</th>
                    <th> Subject</th>
                    <th>Attachments</th>
                    <th>Remarks</th>
                </tr>
               {
                    tranmittedDTS.map(( row, index) => 
                        <tr key={index} style={{'border-bottom':'1px solid black', 'font-size':'10px'}}>
                            <td style={{'text-align':'justify','padding':'5px'}}>{row.dts}</td>
                            <td style={{'text-align':'justify','padding':'5px'}}>{row.barcode}</td>
                            <td style={{'text-align':'justify','padding':'5px'}}>{row.subject}</td>
                            <td style={{'text-align':'justify','padding':'5px'}}>{row.attachments}</td>
                            <td style={{'text-align':'justify', 'padding':'5px'}}></td>
                        </tr>
                    )
               }
            </table>
            <p style={{'text-align':'left', 'font-size':'10px'}}>Kindly acknowledge receipt hereof.</p>
            <p style={{'text-align':'left', 'font-size':'10px'}}>Total No. of documents: {count}</p>
            <br/>
            <br/>

            <p style={{'text-align':'left', 'font-size':'10px'}}>Transferred By:</p>
            <p style={{'text-align':'left', 'font-size':'10px'}}>{transferred_by}</p>


            <p style={{'text-align':'left', 'font-size':'10px'}}>Series: {series}</p>
        </div>
    )
}

export default DTSPrintBulkTransfer