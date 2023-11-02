import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Contact from './Contact'; // Import the Contact component
//import Aboutus from './Contact1';
import CRUD from './CRUD';
import Contactus from './Contactus';
import Aboutus from './Aboutus';
import Services from './Services';
function App() {
  return (
    <Router>
      <Routes>
	 
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/Contactus" element={<Contactus />} />

        <Route path="/Services" element={<Services />} />       
        <Route path="/CRUD" element={<CRUD />} />
        {/* Add more routes for other components if needed */}
	
      </Routes>
    </Router>

  );
}

export default App;
