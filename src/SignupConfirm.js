"use strict"

import React, { Component } from 'react'

import BackButton from './BackButton'

class SignupConfirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked : false,
    }

    this.onConfirm = this.onConfirm.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
    this._renderAgreementBox = this._renderAgreementBox.bind(this);
    this._renderRegisterButton = this._renderRegisterButton.bind(this);

  }

  componentWillReceiveProps(props) {
    if (!this.props.display) {
      this.setState({ checked : false });
    }
  }
  
  render() {
    const display = this.props.display ? 'block' : 'none';
    return (
      <div className = "loginform-backdrop" style = {{ display }} >

        <span className ="w3-button w3-red  w3-display-topright" onClick = {this.props.close}>X</span>

        <div className = "loginform-panel w3-container" >

          <BackButton onClick = {this.props.back} />

          {this._renderAgreementBox()}

          <hr />

          {this._renderRegisterButton()}

        </div>

      </div>
    )
  }

  onConfirm() {
    this.props.signup && this.props.signup();
  }

 _renderAgreementBox() {
  return (
    <div className = "w3-text-grey">
      <div style = {{marginBottom: '8px'}} >
        Please read the <a className = "w3-text-blue" href = "#" > Terms and Services </a> Agreement. 
        Check the box if you accept them.
      </div>
      <div style = {{marginBottom: '16px'}} >
          <input className = "w3-check" 
                 type="checkbox" 
                 checked = {this.state.checked}
                 onChange = {this.toggleChecked} />
          <label> Agree <a>Terms & Services</a> </label>
      </div>
    </div>
  )
 }

 toggleChecked() {
   this.setState({ checked: !this.state.checked });
 }

  _renderRegisterButton() {
    const disabled = this.props.syncing || !this.state.checked ? 'disabled' : '';
    return (
      <div>        
        <div style = {{marginBottom: '24px'}}>
          <button className = {`w3-button w3-block w3-blue w3-${disabled}`}
                  onClick = {this.onConfirm} disabled = {disabled.length > 0 ? true : false} > 
            {
              this.props.syncing? 'Connecting to server...' : 'Register' 
            }
          </button>
        </div>
      </div>
    )
  }


}

export default SignupConfirm