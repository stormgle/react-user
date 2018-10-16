"use strict"

import React, { Component } from 'react'

import { signup, checkUserExist } from '@stormgle/auth-client'

import SingupEmail from './SignupEmail'
import SignupPassword from './SignupPassword'
import SignupUserFullName from './SignupUserFullName'
import SignupUserContact from './SignupUserContact'
import SignupConfirm from './SignupConfirm'

import Alert from './Alert'
import ErrorPage from './ErrorPage'

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      flow : 'email',
      email: '',
      password: '',
      profile: {},
      alert: false,
      diag: {},
      syncing: false,
      message: ''
    }

    this.flow = ['email', 'password', 'fullname', 'contact', 'confirm', 'success']

    this.next = this.next.bind(this);
    this.signup = this.signup.bind(this);
    this.back= this.back.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this._flow = this._flow.bind(this);
    this._renderAlertBox = this._renderAlertBox.bind(this);
  }

  componentWillMount() {
    if (this.props.email) {
      this.setState({ email: this.props.email });
    }
  }

  render() {
    return(
      <div>
        {this._renderAlertBox(this.state.diag)}
        {this._renderSignupPath()}
      </div>
    )
  }

  _renderSignupPath() {
    return (
      <div>
        <SingupEmail  display = {this._flow('email')}
                      next = {this.next}
                      back = {this.back}
                      email = {this.state.email}
                      message = {this.state.message}
                      syncing = {this.state.syncing}
                      close = {this.props.close}
        />
        <SignupPassword display = {this._flow('password')}
                        next = {this.next}
                        back = {this.back}
                        email = {this.state.email}
                        close = {this.props.close}
        />
        <SignupUserFullName   display = {this._flow('fullname')}
                              next = {this.next}
                              back = {this.back}
                              email = {this.state.email}
                              close = {this.props.close}
        />
        <SignupUserContact    display = {this._flow('contact')}
                              next = {this.next}
                              back = {this.back}
                              email = {this.state.email}
                              profile = {this.state.profile}
                              close = {this.props.close}
        />
        <SignupConfirm display = {this._flow('confirm')}
                        signup = {this.signup}
                        back = {this.back}
                        email = {this.state.email}
                        syncing = {this.state.syncing}
                        close = {this.props.close}
        />
        <ErrorPage  display = {this._flow('failure')}
                    goBack = {() => this.back('email')}
        />
      </div>
    )
  }

  next({email, password, profile}) {

    if (!email) {
      email = this.state.email;
    }

    if (!password) {
      password = this.state.password;
    }

    if (!profile) {
      profile = this.state.profile;
    }

    this.setState({ email, password, profile, syncing: true, message: '' });

    const current = this.state.flow;

    /* check email already registered before moving to next state */
    if (current === 'email') {
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

      checkUserExist(this.props.api.check,
        { username : email },
        {
          onSuccess: (data) => { 
            if (data) {
              const message = 'This email is already registered';
              this.setState({ message, syncing: false, alert: false })
            } else {
              this.setState({ flow: 'password', syncing: false, alert: false, message: '' });
              clearTimeout(to);
            }
          },
          onFailure: (err) => { 
            if (isNaN(err)) {
              const message = JSON.parse(err).error;
              this.setState({ message, syncing: false, alert: false })
            } else {
              this.setState({ flow: 'failure', syncing: false, alert: false })
            }
            clearTimeout(to);
          }
        }
      )
    } else {
      const index = this.flow.indexOf(current);
      if (index < this.flow.length - 1) {
        this.setState({ flow: this.flow[index+1], syncing: false, alert: false, message: '' });
      }
    }
  }

  back(flow) {
    if (typeof flow === 'string' && this.flow.indexOf(current) !== -1) {
      this.setState({ alert: false, flow });
    } else {
      const current = this.state.flow;
      const index = this.flow.indexOf(current);
      if (index > 0) {
        this.setState({ alert: false, flow: this.flow[index-1] });
      }
      else if (index === 0) {
        this.props.openLoginForm && this.props.openLoginForm();
      }
    }
  }

  signup() {
    const username = this.state.email;
    const password = this.state.password;
    const profile = this.state.profile;

    this.setState({ alert: false, syncing : true });

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
    
    signup(this.props.api.signup,
      { username, password, profile},
      {
        onSuccess: (data) => { 
          // this.setState({ flow: 'success', syncing: false, alert: false }) 
          clearTimeout(to);
          this.props.close && this.props.close();
        },
        onFailure: (err) => { 
          this.setState({ flow: 'failure', syncing: false, alert: false })
          clearTimeout(to);
        }
      }
    )

  }

  closeAlert() {
    this.setState({ alert: false });
  }

  _flow(flow) {
    return this.state.flow === flow;
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

export default SignupForm