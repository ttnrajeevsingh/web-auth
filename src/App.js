import React, { Component } from 'react';

import './App.css';
import { createCreds, validateCreds } from './webauthn';

const buttonStyle = {
  padding: 10,
  margin: 5
}
const hideButton = {
  padding: 10,
  margin: 5,
  // display:'none'
}
class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">

          {/* <img style={{
              height: "20vh"
            }} 
            src="cyber-security.svg" 
            alt="" /> */}
          
          <p>
            Biometric auth Demo
          </p>
          
          
          
          <button 
            style={buttonStyle} 
            onClick={createCreds}
          >
            Register
          </button>

          <button 
            style={hideButton}
            className='hide' 
            onClick={validateCreds}
          >
            Login
          </button>

        </header>
      </div>
    );
  }
}

export default App;
