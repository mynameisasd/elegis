import logo from './logo.svg';
import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Container, } from 'react-bootstrap';
import Login from './Login';
import Excerpts from './Excerpts';
import DTSArchive from './DTSArchive';
import DTSMetaData from './DTSMetaData';
import AddExcerpts from './AddExcerpts';
import UploadExcerpts from './UploadExcerpts';
import DTSAdd from './DTSAdd';
import DTSAddTemp from './DTSAddTemp';
import DTSPrint from './DTSPrint';
import DTSUpload from './DTSUpload';
import DTSEdit from './DTSEdit';
import EditExcerpts from './EditExcerpts';
import TransferExcerpts from './TransferExcerpts';
import PrintTransmittalExcerpts from './PrintTransmittalExcerpts';
import DTSReferral from './DTSReferral';
import TransmittalList from './TransmittalList';
import DTSBulkTransfer from './DTSBulkTransfer';
import DTSAdditionalFile from './DTSAdditionalFile';
import DTSPrintBulkTransfer from './DTSPrintBulkTransfer';
import DTSTransmittalList from './DTSTransmittalList';
import Dashboard from './Dashboard';
import ExcerptsMetaData from './ExcerptsMetaData';
import ExcerptsSource from './ExcerptsSource';
import ExcerptsMovement from './ExcerptsMovement';


export const ApiContext = React.createContext();

const api = {
  excerpts: 'http://192.168.0.106/excerpts/' ,
  dts: 'http://192.168.0.106/document_tracking/',
}


function App() {
  return (
    <Container fluid>
      <div className="App">
        <ApiContext.Provider value={api}>
          <Router basename='/'>
            <div>
              <Routes> 
                <Route path="/"  element={<Login />} />
                <Route path="/dashboard"  element={ <Dashboard /> } />
                <Route path="/excerpts"  element={<Excerpts />} />
                <Route path="/excerpts_movement"  element={<ExcerptsMovement />} />
                <Route path="/add_excerpts"  element={<AddExcerpts />} />
                <Route path="/excerpts_metadata/:id"  element={<ExcerptsMetaData />} />
                <Route path="/excerpts_source/:id/:reference_number"  element={<ExcerptsSource />} />
                <Route path="/edit_excerpts/:id"  element={<EditExcerpts /> } />
                <Route path="/upload_excerpts/:id/:reference_number"  element={ <UploadExcerpts /> } />
                <Route path="/transfer_excerpts"  element={ <TransferExcerpts /> } />
                <Route path="/print_transmittal_excerpts/:series"  element={ <PrintTransmittalExcerpts /> }  />
                <Route path="/transmittal_list"  element={ <TransmittalList /> }  />
                <Route path="/dts_archive"  element={<DTSArchive />} />
                <Route path="/dts_metadata/:barcode/:id"  element={<DTSMetaData />} />
                <Route path="/dts_add"  element={<DTSAdd /> } />
                <Route path="/dts_edit/:barcode/:id"  element={<DTSEdit /> } />
                <Route path="/dts_add_temp"  element={<DTSAddTemp /> } />
                <Route path="/dts_print/:barcode"  element={<DTSPrint /> } />
                <Route path="/dts_upload/:id/:dts"  element={<DTSUpload /> } />
                <Route path="/dts_referral/:id/:dts/:barcode"  element={ <DTSReferral /> } />
                <Route path="/dts_bulk_transfer"  element={ <DTSBulkTransfer /> } />
                <Route path="/dts_bulk_transfer_print/:series/:transferred_by/:date"  element={ <DTSPrintBulkTransfer /> } />
                <Route path="/dts_additional_file/:barcode/:id"  element={ <DTSAdditionalFile /> } />
                <Route path="/dts_transmittal_list"  element={ <DTSTransmittalList /> } />
              </Routes>
            </div>
          </Router>
        </ApiContext.Provider>
      </div>
    </Container>
  );
}

export default App;
