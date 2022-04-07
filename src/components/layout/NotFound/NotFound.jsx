import React from 'react';
import { Link } from 'react-router-dom';
import error404 from "../../../assets/error404.png"

const NotFound = () => {
  return (
      <>
          <img src={error404} alt="Error 404" style={{width:"50%",marginLeft:"25%"}}/>
          <Link to="/" style={{display:"block", textAlign:"center", fontSize:"24px", textDecoration:"none"}}>Go Home</Link>
      </>
  );
};

export default NotFound;
