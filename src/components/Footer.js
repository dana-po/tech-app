import React from 'react'
import './Footer.css'


const Footer = () => {
  return (
    <div className="footer">
      <h5>&copy; {new Date().getFullYear()}
        <span> CozyCorner &#9829;</span>
      </h5>
   
    </div>
  );
}


export default Footer
