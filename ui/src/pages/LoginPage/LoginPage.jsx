import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import Apple from '../../images/apple.svg';
const axios = require('axios');

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authenticate = () => {
    axios.post('http://localhost:4001/authenticate', {
      email, password
    }).then((res) => {
      localStorage.setItem('userID', res.data.data.id);
      history.push('/app');
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  const handleLogin = () => {

  }

  return (
    <div className="user-page-root">
      <div className="content-container">
        <span className="title">Song Sync</span>
        <div className="step-container">
          <span className="step-span">Step 1: Enter the email and password associated with your account.</span>
          <div className="user-info-form">
            <input className="user-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input className="user-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button className="new-user-done-button" onClick={() => authenticate()}>Done</button>
          </div>
        </div>
        <div className="step-container">
          <span className="step-span">Step 2: Log into your Apple music account</span>
          <button id="apple-music-authorize" onClick={handleLogin}><img className="apple-icon" src={Apple} />Sign in with Apple</button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginPage);