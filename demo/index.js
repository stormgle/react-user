"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import { logout } from '@stormgle/auth-client'

import Login from '../src/Router'
import UserProvider from '../src/UserProvider'

import { bindUserProvider } from '../src/utils'

class Display extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLogin : false
    }

  }

  render() {
    if (this.props.user) {
      return(
        <div>
          <div className = "w3-bar w3-black">
            <div className = "w3-bar-item"> {this.props.user.email} </div>
            <button className = "w3-bar-item w3-right w3-hover-blue w3-button"
                    onClick = {logout} > 
              Logout 
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <Login show = {this.state.showLogin} close = {() => this.setState({showLogin:false})} />
          <div className ="w3-bar w3-black">
          <button className = "w3-bar-item w3-right w3-hover-blue w3-button"
                    onClick = {() => this.login()} > 
              Login 
            </button>
          </div>
        </div>
      )
    }
    
  }

  login() {
    this.setState({ showLogin : true });
  }

}

const DisplayUser = bindUserProvider(Display);

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className = "w3-container" >
        <DisplayUser />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));