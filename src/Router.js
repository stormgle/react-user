"use strict"

import React, { Component } from 'react'

import LoginFrom from './LoginForm'
import SignupForm from './SignupForm'

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: 'login',
      email: ''
    }

    this.openSignupForm = this.openSignupForm.bind(this);
    this.openLoginForm = this.openLoginForm.bind(this);

  }

  render() {
    if (this.props.show) {
      if (this.state.route === 'login') {
        return (
          <LoginFrom  openSignupForm = {this.openSignupForm} 
                      api = {this.props.api}
                      close = {this.props.close} 
          />
        )
      } else {
        return (
          <SignupForm openLoginForm = {this.openLoginForm} 
                      api = {this.props.api}
                      email = {this.state.email} 
                      close = {this.props.close} 
          />
        )
      }   
    } else {
      return null;
    }
  }

  openSignupForm(email) {
    this.setState({ email: email, route: 'signup' })
  }

  openLoginForm() {
    this.setState({ route: 'login' })
  }

}