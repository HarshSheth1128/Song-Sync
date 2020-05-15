import React, { useState } from 'react';
import './styles/css/index.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import SplashPage from './pages/SplashPage/SplashPage';
import MainPage from './pages/MainPage/MainPage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { CookiesProvider } from 'react-cookie';

function App() {
  const history = createBrowserHistory();
  return (
    <div className="App">
      <CookiesProvider>
        <Router history={history}>
          <Switch>
            <Route path="/splash">
              <SplashPage history={history} />
            </Route>
            <Route path="/signup">
              <SignupPage history={history} />
            </Route>
            <Route exact path="/login">
              <LoginPage history={history} />
            </Route>
            <Route path="/app">
              <MainPage history={history} />
            </Route>
          </Switch>
        </Router>
      </CookiesProvider>
    </div>
  );
}

export default App;
