"use strict"

import React, { Component } from 'react'

import { isEmail } from './utils'

import BackButton from './BackButton'
import Message from './Message'

class SignupEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message : '',
      email: ''
    }

    this.onConfirm = this.onConfirm.bind(this);
    this.getTypedEmail = this.getTypedEmail.bind(this);
    this.handleKeyUpForEmail = this.handleKeyUpForEmail.bind(this);
    this._renderEmailBox = this._renderEmailBox.bind(this);
    this._renderConfirmButton = this._renderConfirmButton.bind(this);

  }

  componentWillMount() {
    if (this.props.email) {
      this.setState({ email: this.props.email });
    }
  }

  componentWillReceiveProps(props) {
    if (props.message.length > 0) {
      this.setState({ message: props.message });
    }
  }
  
  render() {
    const display = this.props.display ? 'block' : 'none';
    return (
      <div className = "loginform-backdrop" style = {{ display }} >

        <span className ="w3-button w3-red  w3-display-topright" onClick = {this.props.close}>X</span>

        <div className = "loginform-panel w3-container" >

          <BackButton onClick = {this.props.back} title = 'Back to Login page' />

          <div >
            <h3> Create Account </h3>
          </div>

          <div className ="w3-text-blue" >
            Please enter your email and password for register new account
          </div>

          <hr />

          {this._renderEmailBox()}

          {this._renderConfirmButton()}

        </div>

      </div>
    )
  }

  getTypedEmail(evt) {
    const email = evt.target.value;
    const message = email.length === 1 ? '' : this.state.message; 
    this.setState ({ email, message });
  }

  handleKeyUpForEmail(evt) {
    if (evt.which === 13 || evt.keyCode === 13) {
      this.onConfirm();
    }
  }

  onConfirm() {

    let message = '';
    const email = this.state.email;

    if (!isEmail(email)) {
      message = 'Invalid Email Address';
      if (email.length === 0) {
        message = 'Email is empty';
      }
    }

    if (message.length === 0) {
      this.setState({ email, message})
      this.props.next && this.props.next({email});
    } else {
      this.setState({ message })
    }
    
  }

  _renderEmailBox() {
    const borderColor = this.state.message.length === 0 ? '' : 'w3-border-red';
    return (
      <div>
        <div className = "w3-text-grey" style = {{marginBottom: '8px'}} > 
          Email 
        </div>
        <div>
          <input className = {`w3-input w3-border singupform-email ${borderColor}`}
                type = "text" 
                placeholder = "your email"
                value = {this.state.email}
                ref = { (inst) => inst && inst.focus() }
                onChange = {this.getTypedEmail}
                onKeyUp = {this.handleKeyUpForEmail} />
        </div>
        <Message message = {this.state.message} />

      </div>
    )
  }

 

  _renderConfirmButton() {
    const disabled = this.props.syncing? true : false
    return (
      <div style = {{marginBottom: '72px'}}>
        <button className = {`w3-button w3-right w3-blue ${this.props.syncing? 'w3-disabled' : ''}`}
                onClick = {this.onConfirm}
                disabled = {disabled} > 
          {
            this.props.syncing?
              <label> Checking email...</label>
              :
              <label> Continue <i className ="fa fa-chevron-right" /> </label>
          }        
        </button>
      </div>
    )  
  }


}

export default SignupEmail