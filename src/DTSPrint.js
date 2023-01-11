import React, { useContext, useEffect, useState } from 'react'
import { useParams  } from 'react-router-dom'
import { ApiContext } from './App'
import Barcode from 'react-barcode'
import QRCode from "react-qr-code"
import axios from 'axios'



const DTSPrint = () => {

    const api = useContext(ApiContext)
    const { barcode } = useParams()

    const [ DTSInfo, setDTSInfo ] = useState([{}])

    let data = {
        barcode:barcode
    }

    useEffect(()=>{

        axios.post( api.dts + 'get_dts_info_for_print.php', data )
        .then(function (response) {
    
          setDTSInfo(response.data);

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
         
            <br />
                <table style={{'background':'#eee', 'padding':'15px'}}>
                    <tr>
                        <td  style={{'text-align':'left', 'width': '10%'}}>
                            <h4 >DTS No.:</h4>
                        </td>
                        <td style={{'text-align':'left', 'width': '10%'}}>
                            <h4>{DTSInfo[0]['dts']}</h4>
                        </td>
                        <td style={{'text-align':'center', 'width':'40%'}}>
                            <Barcode height={30} value={barcode} />
                        </td>
                        <td style={{'text-align':'center', 'width':'5%'}}>
                            <QRCode style={{'width':'100px', 'height':'100px'}} value={barcode} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            
                        </td>
                        <td>

                        </td>
                    </tr>
                </table>
            <hr />
            <table width="100%">
                <tr>
                    <td style={{'text-align':'left', 'width': '20%', 'font-size':'12px'}}>
                        From:
                    </td>
                    <td style={{'text-align':'left', 'width': '80%','font-size':'12px'}}>
                        {DTSInfo[0]['from']}
                    </td>
                </tr>
                <tr>
                    <td style={{'text-align':'left', 'width': '20%', 'font-size':'12px'}}>
                        Date Received:
                    </td>
                    <td style={{'text-align':'left', 'width': '80%', 'font-size':'12px'}}>
                        {DTSInfo[0]['date_and_time']}
                    </td>
                </tr>
                <tr>
                    <td style={{'text-align':'left', 'width': '20%', 'font-size':'12px'}}>
                        Subject:
                    </td>
                    <td style={{'text-align':'left', 'width': '80%', 'font-size':'12px'}}>
                        {DTSInfo[0]['subject']}
                    </td>
                </tr>
                <tr>
                    <td style={{'text-align':'left', 'width': '20%', 'font-size':'12px'}}>
                        Attachments:
                    </td>
                    <td style={{'text-align':'left', 'width': '80%', 'font-size':'12px'}}>
                        {DTSInfo[0]['attachments']}
                    </td>
                </tr>
                <tr>
                    <td style={{'text-align':'left', 'width': '20%', 'font-size':'12px'}}>
                        Received By:
                    </td>
                    <td style={{'text-align':'left', 'width': '80%', 'font-size':'12px'}}>
                        {DTSInfo[0]['received_by']}
                    </td>
                </tr>
                <tr>
                    <td style={{'text-align':'left', 'width': '20%', 'font-size':'12px'}}>
                        Contact Person:
                    </td>
                    <td style={{'text-align':'left', 'width': '80%', 'font-size':'12px'}}>
                        {DTSInfo[0]['contact_person']}
                    </td>
                </tr>
            </table>
            <hr/>
            <h5>MANUAL DOCUMENT MOVEMENT LOG</h5>
            <table width="100%">
                <tr style={{"border":'1px solid black', 'width':'100%'}}>
                    <td style={{'text-align':'left', 'padding':'5px', 'font-size':'12px'}}>Legislative Section</td>
                </tr>
                <tr style={{"border":'1px solid black', 'width':'100%'}}>
                    <td style={{'border':'1px solid black','width':'30%', 'text-align':'left', 'font-size':'12px'}}>Committee Referral Date and Committee</td>
                    <td style={{'border':'1px solid black'}}></td>
                </tr>
                <tr style={{'border':'1px solid black', 'height':'100px'}}>
                    <td style={{'text-align':'left'}}><small style={{'font-size':'12px'}}>{DTSInfo[0]['remarks']}</small></td>
                </tr>
                <tr style={{"border":'1px solid black', 'width':'100%'}}>
                    <td style={{'text-align':'left', 'padding':'5px', 'font-size':'12px'}}>Records Section</td>
                </tr>
                <tr style={{"border":'1px solid black', 'width':'100%'}}>
                    <td style={{'border':'1px solid black','width':'30%', 'text-align':'left', 'font-size':'12px'}}>Date Received by Records Section</td>
                    <td style={{'border':'1px solid black'}}></td>
                </tr>
                <tr style={{"border":'1px solid black', 'width':'100%'}}>
                    <td style={{'border':'1px solid black','width':'30%', 'text-align':'left', 'font-size':'12px'}}>General Records Classification</td>
                    <td style={{'border':'1px solid black'}}></td>
                </tr>
                <tr style={{"border":'1px solid black', 'width':'100%'}}>
                    <td style={{'border':'1px solid black','width':'30%', 'text-align':'left', 'font-size':'12px'}}>General Records Disposition Schedule</td>
                    <td style={{'border':'1px solid black'}}></td>
                </tr>
                <tr style={{'border':'1px solid black', 'height':'100px'}}>
                    <td></td>
                </tr>
            </table>
        </div>
    )
}

export default DTSPrint