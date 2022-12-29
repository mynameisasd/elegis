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


export const ApiContext = React.createContext();

const api = {
  excerpts: 'http://localhost/excerpts/' ,
  dts: 'http://localhost/document_tracking/'
}


function App() {
  return (
    <Container fluid>
      <div className="App">
        <ApiContext.Provider value={api}>
          <Router>
            <div>
              <Routes basename="/"> 
                <Route path="/"  element={<Login />} />
                <Route path="/excerpts"  element={<Excerpts />} />
                <Route path="/add_excerpts"  element={<AddExcerpts />} />
                <Route path="/edit_excerpts/:id"  element={<EditExcerpts /> } />
                <Route path="/upload_excerpts/:id/:reference_number"  element={ <UploadExcerpts /> } />
                <Route path="/transfer_excerpts"  element={ <TransferExcerpts /> } />
                <Route path="/dts_archive"  element={<DTSArchive />} />
                <Route path="/dts_metadata/:barcode"  element={<DTSMetaData />} />
                <Route path="/dts_add"  element={<DTSAdd /> } />
                <Route path="/dts_edit/:barcode"  element={<DTSEdit /> } />
                <Route path="/dts_add_temp"  element={<DTSAddTemp /> } />
                <Route path="/dts_print/:barcode"  element={<DTSPrint /> } />
                <Route path="/dts_upload/:id/:dts"  element={<DTSUpload /> } />
              </Routes>
            </div>
          </Router>
        </ApiContext.Provider>
      </div>
    </Container>
  );
}

export default App;
