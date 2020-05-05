import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{textAlign:'center'}}>
      <img src='https://http.cat/404' alt='page not found'/>
      <p>
        <Link to='/'>Go to Home </Link>
      </p>
    </div>
  );
}