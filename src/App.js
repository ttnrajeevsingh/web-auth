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
  constructor(props){
    super(props);
    this.state={
      userName:''
    }
  }
  handleChange = (e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
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
          
          <input type="text" onChange={this.handleChange} name="userName" value={this.state.userName}></input>
          
          <button 
            style={buttonStyle} 
            id="reg"
            onClick={()=>{
              createCreds(this.state.userName);
            }}

          >
            Register
          </button>

          <button 
                      id="login"
            style={hideButton}
            className='hide' 
            onClick={()=>{validateCreds(this.state.userName)}}
          >
            Login
          </button>

        </header>
      </div>
    );
  }
}

export default App;
