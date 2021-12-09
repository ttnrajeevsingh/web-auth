import React, { Component } from 'react';

import './App.css';
import { createCreds, validateCreds } from './webauthn';

const buttonStyle = {
  padding: 10,
  margin: 5
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
            Login with Biometric data
          </button>

          {/* <button 
            style={buttonStyle} 
            onClick={validateCreds}
          >
            Validate Creds
          </button> */}

        </header>
      </div>
    );
  }
}

export default App;
