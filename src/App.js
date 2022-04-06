import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import logoItReader from './itReader_logo.png';
import logoSoftKare from './softkare_logo.png';
import Login from "./components/login_comp";
import SignUp from "./components/signup_comp";
import ResetPass from "./components/resetPass_comp";
import EmailSent from "./components/emailSent_comp";
import Profile from "./components/profile_comp";
import editProfile from "./components/editProfile_comp";

function App() {
  return (<Router>
    <header className="App-header">
      <Link className="nav-link" to={""}><img src={logoItReader} className="App-logo_IR" alt="logoIR" /></Link>
    </header>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={""}><img src={logoSoftKare} className="App-logo_SK" alt="logoSK" /></Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Iniciar sesión</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Registrar</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/reset" component={ResetPass} />
            <Route path="/email-sent" component={EmailSent} />
            <Route path="/profile" component={Profile} />
            <Route path="/edit-profile" component={editProfile} />
          </Switch>
        </div>
      </div>

    </div></Router>
  );
}

export default App;
