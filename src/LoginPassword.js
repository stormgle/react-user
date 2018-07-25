"use strict"

import React, { Component } from 'react'

import Message from './Message'
import BackButton from './BackButton'

class LoginPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message : '',
      password: ''
    }

    this.getTypedPassword = this.getTypedPassword.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.login = this.login.bind(this);

  }

  componentDidMount() {
    if (this.pwdInputEl) {
      this.pwdInputEl.focus();
    }
  }

  render() {
    const display = this.props.display ? 'block' : 'none';
    return (
      <div className = "loginform-backdrop" style = {{ display }} >
        <span className ="w3-button w3-red w3-display-topright" onClick = {this.props.close}>X</span>

        <div className = "loginform-panel w3-container" >

          <BackButton onClick = {this.props.goBack} />

          <div>
            <h3 className = "w3-text-blue" > {this.props.email} </h3>
          </div>
          
          <hr />

          <div>
            <div className = "w3-text-grey" style = {{marginBottom: '8px'}} > 
              Enter your password to login 
            </div>
            <input className = "w3-input w3-border"
                    type = "password" 
                    placeholder = "password"
                    ref = { (inst) => inst && inst.focus() }
                    onChange = {this.getTypedPassword}
                    onKeyUp = {this.handleKeyUp} />
            <Message message = {this.props.message} />  
          </div>

          <div>
            <button className = {`w3-button w3-block w3-blue ${this.props.syncing? 'w3-disabled' : ''}`} 
                    onClick = {this.login}
                    disabled = {this.props.syncing? true : false} > 
              {
                this.props.syncing? 'Connecting to server...' : 'Login' 
              } 
            </button>
          </div>

          <div style = {{marginTop: '8px'}} >
            <label> Forgot your password, <a href = "#" > click here </a> </label>
          </div>

        </div>

      </div>
    )
  } // render

  getTypedPassword(evt) {
    const password = evt.target.value;
    this.setState({ password })
  }

  handleKeyUp(evt) {
    if (evt.which === 13 || evt.keyCode === 13) {
      this.login();
    }
  }

  login() {
    const { email, password } = {
      email: this.props.email,
      password: this.state.password
    }
    /* validate password weakness */
    /* login */
    this.props.login && this.props.login({email, password});
  }


}

export default LoginPassword