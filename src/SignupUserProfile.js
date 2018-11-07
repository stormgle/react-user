"use strict"

import React, { Component } from 'react'

import BackButton from './BackButton'

class SignupUserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastName: '',
      middleName: '',
      firstName: '',
      gender: '',
    }

    this.onConfirm = this.onConfirm.bind(this);

  }

  componentWillMount() {

  }

  componentWillReceiveProps(props) {

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
            Please input your name & gender
          </div>

          <div style = {{marginBottom: '24px'}}>
            <p>
              <label>Last Name</label>
              <input    className="w3-input w3-border"
                        type="text"
                        value={this.state.lastName}
                        onChange = {this.getTyped('lastName')}
                        onKeyUp = {this.handleKeyUp('lastName')}
              />
            </p>
            <p>
              <label>Middle Name</label>
              <input    className="w3-input w3-border"
                        type="text"
                        value={this.state.middleName}
                        onChange = {this.getTyped('middleName')}
                        onKeyUp = {this.handleKeyUp('middleName')}
              />
            </p>
            <p>
              <label>First Name</label>
              <input    className="w3-input w3-border"
                        type="text"
                        value={this.state.firstName}
                        onChange = {this.getTyped('firstName')}
                        onKeyUp = {this.handleKeyUp('firstName')}
              />
            </p>
            <p>
              <label>Gender</label> <br />
              <span style={{marginRight: '32px'}}>
                <input  className="w3-radio" type="radio" name="gender" value="male" 
                        checked = {this.state.gender === 'male'}
                        onChange = { () => this.setState({gender: 'male'}) }
                />
                <label>Male</label>
              </span>
              <span>
                <input  className="w3-radio" type="radio" name="gender" value="female" 
                        checked = {this.state.gender === 'female'}
                        onChange = { () => this.setState({gender: 'female'}) }
                />
                <label>FeMale</label>
              </span>
              
            </p>
            
          </div>

          <div style = {{marginBottom: '72px'}}>
            <button className = {`w3-button w3-right w3-blue ${this.state.firstName.length === 0? 'w3-disabled' : ''}`}
                    onClick = {this.onConfirm} 
                    disabled = {this.state.firstName.length === 0} > 
                    Continue <i className ="fa fa-chevron-right" /> 
            </button>
          </div>
        

        </div>

      </div>
    )
  }

  getTyped(target) {
    return (evt) => {
      const state = {}
      state[target] = evt.target.value
      this.setState(state)
    }
  }

  handleKeyUp(target) {
    return (evt) => {
      // console.log(evt.which + '/' + evt.keyCode)
    }
  }

  onConfirm() {
    const profile = {
      lastName: this._formatName(this.state.lastName),
      middleName: this._formatName(this.state.middleName),
      firstName: this._formatName(this.state.firstName),
      displayName: this._formatName(this.state.firstName),
      gender: this.state.gender
    }
    this.props.next && this.props.next({profile});
  }

  _formatName(name) {
    return this._toTitleCase(name.replace(/\s+/g, " ").trim());
  }

  _toTitleCase(phrase) {
    return phrase
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
  }

}

export default SignupUserProfile