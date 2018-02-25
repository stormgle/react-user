"use strict"

import React, { Component } from 'react'

import InputEmail from './InputEmail'


class LoginEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    }

    this.updateEmail = this.updateEmail.bind(this);

  }

  render() {
    const display = this.props.display ? 'block' : 'none';
    return (
      <div className = "loginform-backdrop" style = {{ display }} >
        
        <span className ="w3-button w3-red  w3-display-topright" onClick = {this.props.close}>X</span>
          
        <div className = "loginform-panel w3-container" >

          <h3 className = "w3-text-blue"> Join Commuity </h3>
          <hr />

          <label className = "w3-text-grey" > Login with social accounts </label>

          <div className = "loginform-oauth">
            <button className = "w3-button w3-circle w3-ripple w3-metro-dark-blue loginform-btn-large" >  
              <i className ="fa fa-facebook w3-large" /> 
            </button>
            &nbsp; 
            <button className = "w3-button w3-circle w3-ripple w3-red loginform-btn-large" >  
              <i className ="fa fa-google w3-large" /> 
            </button>
          </div>
          
          <hr />
          <div className = "loginform-break">
            <label className = "w3-circle w3-border w3-white loginform-label-or"> OR </label>
          </div>

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
  } // render


  updateEmail(email) {
    this.props.next(email);
  }

}

export default LoginEntry