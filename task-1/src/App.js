import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import TagList from './components/TagList';

import './App.css';
import config from './firebaseConfig';

/*
  TODO:
    Hide Original Components While Dragging
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

  getProfilePicUrl = () => firebase.auth().currentUser.photoURL || '/images/placeholder.png';

  loadSkills = () => {
    const { uid } = firebase.auth().currentUser;
    return firebase.database().ref(`/skills/${uid}`).once('value').then(snap => snap.val());
  }

  saveSkills= (skills) => {
    const { uid } = firebase.auth().currentUser;
    firebase.database().ref(`/skills/${uid}`).set(skills.reduce((acc, cur, index) => {
      acc[`${index}`] = cur;
      return acc;
    }, {}));
  }

  authStateObserver = (user) => {
    const { signedIn } = this.state;
    if (user && !signedIn) {
      this.setState({
        signedIn: true,
      });
    } else if (!user && signedIn) {
      this.setState({
        signedIn: false,
      });
    } else if (signedIn === undefined) {
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
          <div
            className="navbar"
          >
            <img alt="" className="user__profile-img" src={this.getProfilePicUrl()} />
            <div className="user__name">{this.getUserName()}</div>
            <button
              type="button"
              className="button-sign-inout"
              onClick={this.handleSignOut}
            >
              Sign Out
            </button>
          </div>
          <TagList
            saveSkills={this.saveSkills}
            loadSkills={this.loadSkills}
          />
        </div>
      );
    }

    return (
      <div className="app">
        <div className="navbar">
          <button
            type="button"
            className="button-sign-inout sign-in"
            onClick={this.handleSignIn}
          >
            Sign In
          </button>
        </div>
        <div className="sign-in-prompt">
          Sign In to Continue
        </div>
      </div>
    );
  }
}
export default App;
