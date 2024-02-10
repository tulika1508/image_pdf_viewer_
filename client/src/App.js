import React from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Pdf from './pdf.js';
import Img from './img.js';
export default function App() {
  return (
   
    <Routes>
      <Route exact path="/pdf" element={<Pdf />} />
      <Route exact path="/" element={<Img />} />
      
    </Routes>
   
  );
}