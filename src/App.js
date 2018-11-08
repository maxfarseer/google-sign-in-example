import React from 'react'
import * as Sentry from '@sentry/browser'
import { User } from './User'
import './App.css'

/* const qq = null */

class App extends React.Component {
  state = {
    name: null,
    imgUrl: null,
  }
  componentDidMount() {
    const _onInit = auth2 => {
      console.log('init OK', auth2)
    }
    const _onError = err => {
      console.log('error', err)
    }
    window.gapi.load('auth2', function() {
      window.gapi.auth2
        .init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        })
        .then(_onInit, _onError)
    })
  }
  signIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signIn().then(googleUser => {
      const profile = googleUser.getBasicProfile()
      this.setState({
        name: profile.getName(),
        imgUrl: profile.getImageUrl(),
      })
    })
  }
  signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
      this.setState({
        name: null,
        imgUrl: null,
      })
    })
  }
  errorHandler = () => {
    try {
      throw new Error('click on error btn')
    } catch (err) {
      console.warn(err)
      Sentry.captureMessage('Something went wrong')
    }
  }
  render() {
    const { name, imgUrl } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.errorHandler}>error</button>
          {/* <p>{qq.length}</p> */}
          {!name && <button onClick={this.signIn}>Log in</button>}
          {!!name && <button onClick={this.signOut}>Log out</button>}
          {!!name && (
            <User
              name={name}
              imgUrl={imgUrl}
              errorHandler={this.errorHandler}
            />
          )}
        </header>
      </div>
    )
  }
}

export default App
