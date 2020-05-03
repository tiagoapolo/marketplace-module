import React from 'react';
import './App.css';

import { getAuthUrl } from './services/auth'

function App() {

  getAuthUrl()
  .then(x => console.log('x', x))

  return (
    <div className="App">
    </div>
  );
}

export default App;
