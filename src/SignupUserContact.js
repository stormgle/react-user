"use strict"

import React, { Component } from 'react'

import BackButton from './BackButton'

class SignupUserContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: [''],
      address: '',
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
            <h3> Hello {this.props.profile.displayName} </h3>
          </div>

          <hr />

          <div className ="w3-text-blue" >
            Please input your contact
          </div>

          <div style = {{marginBottom: '24px'}}>
            <p>
              <label>Your Phone Number</label>
              {
                this.state.phone.map((phone, index) => {
                  return (
                    <span  key = {index}>
                      <input  className = "w3-input w3-border"
                              type = "text"
                              value = {phone}
                              onChange = {this.getTyped('phone', index)}
                              onKeyUp = {this.handleKeyUp('phone', index)}
                      />
                      <label className="w3-text-blue" style={{cursor: 'pointer'}}> + Add more phone number </label>
                    </span>
                  )

                })
              }
            </p>
            <p>
              <label>City</label>
              
              <input    className="w3-input w3-border"
                        type="text"
                        value={this.state.address}
                        onChange = {this.getTyped('address')}
                        onKeyUp = {this.handleKeyUp('address')}
              />
            </p>
            
          </div>

          <div style = {{marginBottom: '72px'}}>
            <button className = {`w3-button w3-right w3-blue ${this.props.syncing? 'w3-disabled' : ''}`}
                    onClick = {this.onConfirm} > 
                    Continue <i className ="fa fa-chevron-right" /> 
            </button>
          </div>
        

        </div>

      </div>
    )
  }

  getTyped(target, index) {
    if (index !== undefined) {
      return (evt) => {
        const state = {}
        state[target] = [...this.state[target]];
        state[target][index] = evt.target.value;
        this.setState(state)
      }
    } else {
      return (evt) => {
        const state = {}
        state[target] = evt.target.value;
        this.setState(state)
      }
    }
    
  }

  handleKeyUp(target) {
    return (evt) => {
      // console.log(evt.which + '/' + evt.keyCode)
    }
  }

  onConfirm() {
    const profile = {...this.props.profile}
    profile.phone = this.state.phone
    profile.address = this.state.address
    this.props.next && this.props.next({profile});
  }

}

export default SignupUserContact