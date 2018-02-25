"use strict"

import React, { Component } from 'react'

import { scorePassword } from './utils'

import BackButton from './BackButton'
import Message from './Message'

class StrengthIndicator extends Component {
  constructor(props) {
    super(props);

    this.style = {
      node: {
        display: 'inline-block',
        width: '10px',
        height: '10px',
        marginRight: '3px'
      }
    }

    this.title = ['', 'Wreid', 'Wreid', 'Weak', 'Weak', 'Medium', 'Good', 'Awesome']

  }
  render() {
    const score = this.props.score;

    let color = '';
    if (score < 3) {
      color = 'red';
    }
    else if (score < 5) {
      color = 'orange'
    }
    else if (score === 5) {
      color = 'yellow'
    }
    else if (score === 6) {
      color = 'blue'
    }
    else if (score === 7) {
      color = 'green'
    }

    if (score) {
      const nodes = [...Array(7).keys()];
      return (
        <div style = {{height: '26px'}} className = 'w3-right'>
          {
            nodes.map( (i) => {
              const bgColor = i < score ? color : 'grey';
              return(
                <div className = {`w3-${bgColor}`} key = {i} style = {this.style.node} />
              )
            })
          }
          &nbsp; <label className = {`w3-text-${color}`}> {this.title[score]} </label>
        </div>
      )
    } else {
      return (
        <div style = {{height: '26px'}} className = 'w3-right' />
      )
    }
    
  }

}

class SignupPassword extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messageBox1 : '',
      messageBox2 : '',
      password: '',
      score: 0,
      retypePassword: ''
    }

    this.originState = this.state;

    this.onConfirm = this.onConfirm.bind(this);
    this.getTypedPassword = this.getTypedPassword.bind(this);
    this.getReTypePassword = this.getReTypePassword.bind(this);
    this.handleKeyUpForPassword = this.handleKeyUpForPassword.bind(this);
    this.handleKeyUpForRetypePassword = this.handleKeyUpForRetypePassword.bind(this)
    this._renderPasswordBox = this._renderPasswordBox.bind(this);
    this._renderConfirmButton = this._renderConfirmButton.bind(this);

  }

  componentWillReceiveProps(props) {
    if (!props.display) {
      this.setState(this.originState)
    }
  }

  render() {
    const display = this.props.display ? 'block' : 'none';
    return (
      <div className = "loginform-backdrop" style = {{ display }} >

        <span className ="w3-button w3-red  w3-display-topright" onClick = {this.props.close}>X</span>

        <div className = "loginform-panel w3-container" >

          <BackButton onClick = {this.props.back} />

          <div className ="w3-text-blue" >
            <h3> {this.props.email} </h3>
          </div>

          <hr />

          <div className ="w3-text-blue" >
            Please enter your password.
          </div>
          <div className ="w3-text-grey" >
            Your password should contain lower case, upper case, 
            number and special characters.
          </div>

          <hr />

          {this._renderPasswordBox()}

          {this._renderConfirmButton()}

        </div>
      </div>
    )
  }

  getTypedPassword(evt) {
    const password = evt.target.value;
    const messageBox1 = password.length === 0 ? 'Password must not empty' : '';
    this.setState({ password, messageBox1 })
  }

  handleKeyUpForPassword(evt) {
    /* score password */
    const score = scorePassword(evt.target.value);
    this.setState({ score })
  }

  onConfirm() {
    const email = this.props.email;
    const password = this.state.password;
    const retypePassword = this.state.retypePassword;
    /* validate password empty */
    if (password.length === 0) {
      this.setState({ messageBox1 : 'Password must not empty' });
      return
    }
    /* validate password match */
    if (password === retypePassword) {
      this.props.next && this.props.next({email, password});
    }
    else {
      this.setState({ messageBox2 : 'Password mismatch' })
    }
    
  }

  getReTypePassword(evt) {
    const retypePassword = evt.target.value;
    const messageBox2 = retypePassword.length === 0 ? '' : this.state.messageBox2;
    this.setState({ retypePassword, messageBox2 })
  }

  handleKeyUpForRetypePassword(evt) {
    if (evt.which === 13 || evt.keyCode === 13) {
      this.onConfirm();
    }
  }

  _renderPasswordBox() {
    const borderColor1 = this.state.messageBox1.length > 0 ? 'w3-border-red': ''
    const borderColor2 = this.state.messageBox2.length > 0 ? 'w3-border-red': ''
    return (
      <div>

        {/* password */}
        <div>
          <div className = "w3-text-grey" style = {{marginBottom: '8px'}} > 
            Password
            <StrengthIndicator score = {this.state.score} />
          </div>
          <input  className = {`w3-input w3-border ${borderColor1}`}
                  type = "password" 
                  placeholder = "password"
                  value = {this.state.password}
                  onChange = {this.getTypedPassword}
                  onKeyUp = {this.handleKeyUpForPassword}
          />
          <Message message = {this.state.messageBox1} />

        </div>

        {/* retype password */}
        <div>
          <div className = "w3-text-grey" style = {{marginBottom: '8px'}} > 
            Retype Password
          </div>
          <input  className = {`w3-input w3-border ${borderColor2}`}
                  type = "password" 
                  placeholder = "retype your password"
                  value = {this.state.retypePassword}
                  onChange = {this.getReTypePassword}
                  onKeyUp = {this.handleKeyUpForRetypePassword} 
          />
          <Message message = {this.state.messageBox2} />
        </div>

      </div>
    )
  }

  _renderConfirmButton() {
    return (
      <div style = {{marginBottom: '72px'}}>
        <button className = {`w3-button w3-right w3-blue ${this.props.syncing? 'w3-disabled' : ''}`}
                onClick = {this.onConfirm} > 
          Continue <i className ="fa fa-chevron-right" /> 
        </button>
      </div>
    )
  }

}

export default SignupPassword