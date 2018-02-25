"use strict"

import React, { Component } from 'react'

import { loginByPassword, checkUserExist } from '@stormgle/auth-client'

import LoginEntry from './LoginEntry'
import LoginEmail from './LoginEmail'
import LoginPassword from './LoginPassword'

import Alert from './Alert'
import ErrorPage from './ErrorPage'

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      flow : 'entry',
      email: '',
      syncing: false,
      alert: false,
      diag: {},
      message: ''
    }

    this.next = this.next.bind(this);
    this.login = this.login.bind(this);
    this.backToEntryForm = this.backToEntryForm.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.openSignupForm = this.openSignupForm.bind(this);
    this._flow = this._flow.bind(this);
    this._renderLoginPath = this._renderLoginPath.bind(this);
    this._renderAlertBox = this._renderAlertBox.bind(this);
  }


  render() {
    return(
      <div>
        {this._renderAlertBox(this.state.diag)}
        {this._renderLoginPath()}
      </div>
    )
  }

  next(email) {

    /* monitor network timeout */
    const to = setTimeout(() => {
      if (this.state.syncing) {
        const diag = {
          title: 'Network Error!',
          message: 'Cannot connect to the server'
        }
        this.setState({ diag, alert: true, syncing: false })
      }
    }, 10000)

    checkUserExist('/api/user',
      { username : email },
      {
        onSuccess: (data) => { 
          this.setState({ flow: 'password', syncing: false, alert: false });
          clearTimeout(to);
        },
        onFailure: (err) => { 
          if (isNaN(err)) {
            this.setState({ flow: 'email', syncing: false, alert: false })
          } else {
            this.setState({ flow: 'failure', syncing: false, alert: false })
          }
          clearTimeout(to);
        }
      }
    )

    this.setState({ email, syncing: true, alert: false });

  }

  login({ email, password }) {
    if (email !== this.state.email) {
      console.log('error')
      return
    }

     /* monitor network timeout */
     const to = setTimeout(() => {
       console.log('timeout event')
      if (this.state.syncing) {
        const diag = {
          title: 'Network Error!',
          message: 'Cannot connect to the server'
        }
        this.setState({ diag, alert: true, syncing: false })
      }
    }, 10000)

    /* login */
    loginByPassword( '/api/login', 
      { username: email, password: password },
      {
        onSuccess: (data) => {  
          // this.setState({ message: '', flow: 'success', syncing: false, alert: false }) 
          clearTimeout(to);
          this.props.close && this.props.close();
        },
        onFailure: (err) => { 
          if (isNaN(err)) {
            const message = JSON.parse(err).error;
            this.setState({message, syncing: false, alert: false }) 
          } else {
            this.setState({syncing: false, alert: false, flow: 'failure' })
          }
          clearTimeout(to);
        }
      }
    )

    this.setState({ alert: false, syncing: true })

  }

  backToEntryForm() {
    this.setState({ alert: false, flow: 'entry' });
  }

  closeAlert() {
    this.setState({ message: '', alert: false });
  }

  openSignupForm() {
    const email = this.state.email;
    this.props.openSignupForm && this.props.openSignupForm(email);
  }

  _flow(flow) {
    return this.state.flow === flow;
  }

  _renderLoginPath() {
    return (
      <div>
        <LoginEntry next = {this.next} 
                    email = {this.state.email}
                    openSignupForm = {this.openSignupForm}
                    display = {this._flow('entry')}
                    syncing = {this.state.syncing} 
                    close = {this.props.close}
        />
        <LoginPassword login = {this.login}
                       email = {this.state.email} 
                       display = {this._flow('password')} 
                       goBack = {this.backToEntryForm} 
                       syncing = {this.state.syncing}
                       message = {this.state.message}
                       close = {this.props.close}
        />
        <LoginEmail next = {this.next} 
                    display = {this._flow('email')}
                    email = {this.state.email}
                    openSignupForm = {this.openSignupForm}
                    goBack = {this.backToEntryForm}
                    syncing = {this.state.syncing} 
                    close = {this.props.close}
        />
        <ErrorPage  display = {this._flow('failure')}
                    goBack = {this.backToEntryForm}
        />
      </div>
    )
  }

  _renderAlertBox({title, message}) {
    if (this.state.alert) {
      return (
        <Alert  position = 'bottom' 
                color = "red" 
                title = {title}
                message = {message}
                close = {this.closeAlert} />
      )
    } else {
      return null
    }
  }

}

export default LoginForm