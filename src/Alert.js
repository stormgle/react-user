"use strict"

import React, { Component } from 'react'

class Alert extends Component {
  constructor(props) {
    super(props);

    this.style = {
      position: 'fixed',
      right: 0,
      zIndex: 99,
      width: '100%',
      margin: 0
    }

  }

  componentWillMount() {
    this.style[this.props.position || 'top'] = 0;
  }

  render() {
    const position = this.props.position || 'top';
    return(
      <div className = {`w3-panel w3-animate-${position} w3-display-container w3-${this.props.color}`}
           style = {this.style} >
        <span onClick = {this.props.close}
              className = "w3-button w3-red w3-large w3-display-topright">
          &times;
        </span>
        <h3>{this.props.title}!</h3>
        <p>{this.props.message}</p>
      </div> 
    )
  }

}

export default Alert