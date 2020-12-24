import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import {LoginComponent} from "./LoginComponent";
import {ChallengeListComponent} from "./ChallengesListComponent";
import {ChallengeInsideComponent} from "./ChallengeDaysComponent";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Button} from "react-bootstrap";
import { HomeListComponent } from './HomeListComponent';


function App() {
  return (
      <Router>
          <Switch>
              <Route path="/login">
                  <LoginComponent/>
              </Route>

              <Route path="/challenge/:id" component = {ChallengeInsideComponent}/>

              <Route path="/challenges">
                  <ChallengeListComponent/>
              </Route>

              <Route path="/">
                  <HomeListComponent/>
              </Route>
          </Switch>
      </Router>

  );
}

export default App;
