"use strict"

import React, { Component } from 'react'

import BackButton from './BackButton'

class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.report = this.report.bind(this);
  }

  render() {
    const display = this.props.display ? 'block' : 'none';
    return(
      <div className = "loginform-backdrop" style = {{ display }} >
        <div className = "loginform-panel w3-container" >

          <BackButton onClick = {this.props.goBack} /> 

          <h2> (500) Internal Error </h2>

          <div style = {{marginBottom: '24px'}} >
            An error occured in the server. We are sory for the inconvenience.
          </div>

          <div style = {{marginBottom: '24px'}} >
            To report this error to our developer team, click the button below
          </div>

          <button className = "w3-button w3-blue" onClick = {this.report}> Report this error </button>
        
        </div>
      </div> 
    )
  }

  report() {
    const err = this.props.error;
    console.log(JSON.parse(err));
    this.props.goBack();
  }

}

export default ErrorPage