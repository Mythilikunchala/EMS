import React from 'react';
import './Login.css';
import Contact from './Contact'; // Assuming 'Contact' component is in Contact.js

import ResponsiveAppBar from './ResponsiveAppBar'; // Adjust the path to match your project structure
function Home() {
  return (
    <div>
         <ResponsiveAppBar />
         
      <h2>Welcome to our website!</h2>
      <p>We're glad you're here. Feel free to explore our site and discover what we have to offer.</p>
      {/* Add more content as needed */}
    </div>
  );
}

export default Home;
