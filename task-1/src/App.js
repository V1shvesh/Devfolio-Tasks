import React, { Component } from 'react';
import firebase from 'firebase';

import TagList from './components/TagList';

import './App.css';
import config from './firebaseConfig';

/*
  TODO:
    Firebase Auth - UI + Backend
    Hosting
*/


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: undefined,
    };
  }

  componentDidMount() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(this.authStateObserver);
  }

  getUserName = () => firebase.auth().currentUser.displayName;

  getProfilePicUrl = () => firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';

  authStateObserver = (user) => {
    const { signedIn } = this.state;
    if (user && !signedIn) {
      this.setState({
        signedIn: true,
      });
    }

    if (!user && signedIn) {
      this.setState({
        signedIn: false,
      });
    }

    if (signedIn === undefined) {
      this.setState({
        signedIn: false,
      });
    }
  }

  handleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  handleSignOut = () => {
    firebase.auth().signOut();
  }

  render() {
    const { signedIn } = this.state;

    if (signedIn === undefined) {
      return (
        <div className="app">
          <div className="loading">Loading</div>
        </div>
      );
    }

    if (signedIn) {
      return (
        <div className="app">
          <button
            type="button"
            className="button-sign-inout"
            onClick={this.handleSignOut}
          >
            Sign Out
          </button>
          <TagList />
        </div>
      );
    }

    return (
      <div className="app">
        <button
          type="button"
          className="button-sign-inout"
          onClick={this.handleSignIn}
        >
          Sign In
        </button>
      </div>
    );
  }
}
export default App;
