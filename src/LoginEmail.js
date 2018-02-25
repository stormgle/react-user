"use strict"

import React, { Component } from 'react'

import InputEmail from './InputEmail'
import BackButton from './BackButton'

class LoginEmail extends Component {
  constructor(props) {
    super(props);

    this.updateEmail = this.updateEmail.bind(this);

  }
  
  render() {
    const display = this.props.display ? 'block' : 'none';
    
    return (
      <div className = "loginform-backdrop" style = {{ display }} >

        <span className ="w3-button w3-red  w3-display-topright" onClick = {this.props.close}>X</span>

        <div className = "loginform-panel w3-container" >

          <BackButton onClick = {this.props.goBack} />

          <div className ="w3-text-red" >
            This email does not registered. 
          </div>

          <hr />

          <InputEmail value = {this.props.email} 
                      onConfirm = {this.updateEmail}
                      syncing = {this.props.syncing} />

          <div>
            <button className = {`w3-button w3-blue ${this.props.syncing? 'w3-disabled' : ''}`}
                    onClick = {this.props.openSignupForm}
                    disabled = {this.props.syncing? true : false} > 
              Register new account 
            </button>
          </div>

        </div>

      </div>
    )
  }

  updateEmail(email) {
    this.props.next(email);
  }


}

export default LoginEmail