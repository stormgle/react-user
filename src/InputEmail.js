"use strict"

import React, { Component } from 'react'

import { isEmail } from './utils'

import Message from './Message'

class ActiveBtn extends Component {
  render() {
    return(
      <button className = "w3-button w3-circle w3-ripple w3-blue w3-right loginform-btn" 
              onClick = {this.props.onClick} >
        <i className ="fa fa-chevron-right" />
      </button>  
    )
  }
}


class DisabledBtn extends Component {
  render() {
    return(
      <button className = "w3-button w3-disabled w3-right loginform-btn" >
        <i className ="fa fa-refresh fa-spin" style = {{fontSize:'24px'}} />
      </button>  
    )
  }
}


class InputEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      email: ''
    }

    this.getTypedEmail = this.getTypedEmail.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.onConfirm = this.onConfirm.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value.length !== 0) {
      this.setState({email: nextProps.value})
    }
  }
  
  render() {
    const borderColor = this.state.message.length === 0 ? '' : 'w3-border-red';
    return (
      <div className = "loginform-box1">
        <div className = "w3-text-grey" style = {{marginBottom: '8px'}} > 
          Login with your Email 
        </div>
        <div>
          <input className = {`w3-input w3-border loginform-email ${borderColor}`}
                type = "text" 
                placeholder = "your email"
                value = {this.state.email}
                onChange = {this.getTypedEmail}
                onKeyUp = {this.handleKeyUp} 
                disabled = {this.props.syncing} 
          />
          {
            this.props.syncing ?
              <DisabledBtn /> :
              <ActiveBtn onClick = {this.onConfirm} />
          }
        </div> 
        <Message message = {this.state.message} /> 

      </div>
    )
  }

  getTypedEmail(evt) {
    const email = evt.target.value;
    const message = email.length === 1 ? '' : this.state.message; 
    this.setState ({ email, message });
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
      this.props.onConfirm && this.props.onConfirm(email);
    } else {
      this.setState({ message })
    }
  
  }

  handleKeyUp(evt) {
    if (evt.which === 13 || evt.keyCode === 13) {
      this.onConfirm()
    }
  }


}

export default InputEmail