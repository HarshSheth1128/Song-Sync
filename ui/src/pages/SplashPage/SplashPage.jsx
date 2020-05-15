import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom'
import Apple from '../../images/apple.svg';
const AppleMusic = require('../../core/MusicKit');
const axios = require('axios');


const SplashPage = ({ history }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [tokenFetched, setTokenFetched] = useState(false);

  if (!tokenFetched) {
    // On page load get the dev token and store it in browser
    axios.get('http://localhost:4001/dev').then((res) => {
      const { apple, spotify } = res.data;
      setCookie('AppleUser', apple);
      setCookie('SpotifyBearer', spotify);
      // axios.defaults.headers.common['Authorization'] = `Bearer ${res.data}`;
    });
    setTokenFetched(true);
  }

  const handleLogin = () => {
    const { AppleUser } = cookies;
    let userToken = null;
    AppleMusic.configure(AppleUser);
    AppleMusic.getInstance().authorize().then((res) => {
      userToken = AppleMusic.getInstance().api.userToken;
      // axios.defaults.headers.common['Music-User-Token'] = userToken;
    });
    history.push('/app');
  }

  return (
    <div className="login-root">
      <div className="title-content">
        <div className="title-container">
          <span className="main-title">Song Sync</span>
          <span className="main-subtitle">Sync Spotify playlists to your Apple Music account in just a few clicks</span>
          <div className="button-container">
            <button className="button-primary" onClick={() => history.push('/login')}>Log In</button>
            <button className="button-primary" onClick={() => history.push('/signup')}>Sign Up</button>
          </div>
        </div>
      </div>
      <div className="steps-container">
        <div className="step-container">
          <span className="title step-title">Step 1:</span>
          <div className="step-subtext">
            <span className="step-subtitle">Sign into your Apple Music account using secure Apple authentication</span>
            <span className="subtitle-content">We don’t see your account details at all, all of it is handled by Apple!</span>
          </div>
        </div>
        <div className="step-container">
          <span className="title step-title">Step 2:</span>
          <div className="step-subtext">
            <span className="step-subtitle">Create a free and quick Song Sync account</span>
            <span className="subtitle-content">This account is used to manage your synced playlists.</span>
          </div>
        </div>
        <div className="step-container">
          <span className="title step-title">Step 3:</span>
          <div className="step-subtext">
            <span className="step-subtitle">Search for a playlist and sync the playlist to your account</span>
            <span className="subtitle-content">Sync quickly with instant add, or do an advanced sync for more customization.</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default withRouter(SplashPage);