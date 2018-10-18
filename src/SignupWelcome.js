"use strict"

import React, { Component } from 'react'

class SignupWelcome extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    const display = this.props.display ? 'block' : 'none';
    return (
      <div className = "loginform-backdrop" style = {{ display }} >
        <span className ="w3-button w3-red  w3-display-topright" onClick = {this.props.close}>X</span>

        <div className = "loginform-panel w3-container" >

          <div >
            <h3> Welcome {this.props.profile.displayName} </h3>
          </div>

          <p className ="w3-text-blue" >
            Your registration is success
          </p>

          <p className ="w3-text-blue-grey" >
            We have send an email to your email: <span style={{fontWeight: 'bold'}}> {this.props.email} </span> to verify your owner at the last step. 
          </p>

          <p className ="w3-text-blue-grey" >
            To enable all services. Please follow the instruction in the email to activate your account.
          </p>

          <p className ="w3-text-blue-grey">
            Thank you for signing up and using our service.
          </p>

          <div style = {{marginBottom: '72px'}}>
            <button className = {`w3-button w3-blue ${this.props.syncing? 'w3-disabled' : ''}`}
                    onClick = {this.props.userDoLogin} > 
              Login 
            </button>
          </div>

        </div>

      </div>
    )
  }
}

export default SignupWelcome