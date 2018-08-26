"use strict"

import React, { Component } from 'react'

import auth from '@stormgle/auth-client'

class UserProvider extends Component {
  constructor(props) {
    super(props);

    this.state = { user : undefined };

  }

  componentWillMount() {
    // escape server side
    if (typeof window === 'undefined') {
      if (this.props.user) {
        this.setState({ user: this.props.user });
      }
      return
    }

    auth.onStateChange( (state, user) => {
      this.setState({ user });
    });
    
  }

  render() {
    return (
      <div>
        {this.passUserToChildrenProps()}
      </div>
    )
  }

  passUserToChildrenProps() {
    return React.Children.map(
      this.props.children, 
      (child) => {
        return React.cloneElement(child, { user: this.state.user });
      }
    )
  }

}

export default UserProvider