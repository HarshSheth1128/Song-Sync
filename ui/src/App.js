import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
