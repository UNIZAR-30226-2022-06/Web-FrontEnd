import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEdit, faPlay,faShare, faStop, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import '../src/css/style.css';
import Cookies from 'universal-cookie';


import logoItReader from './itReader_logo.png';
import logoSoftKare from './softkare_logo.png';
import Login from "./components/login_comp";
import SignUp from "./components/signup_comp";
import ResetPass from "./components/resetPass_comp";
import EmailSent from "./components/emailSent_comp";
import Profile from "./components/profile_comp";
import editProfile from "./components/editProfile_comp";
import pdfReader from "./components/pdfReader_comp";
import bookUpload from "./components/book_comp";


function App() {
  return (<Router>
    <header class="header">
    <link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css" ></link>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>
    <link rel="stylesheet" href="../src/css/style.css"></link>

    <div class="header-1">
    

    <a href="#" class="logo"><img src="../src/image/itReader_logo.png" width="20" height="20"></img> itReader </a>

    <form action="" class="search-form">
        <input type="search" name="" placeholder="search here..." id="search-box"></input>
        <label for="search-box" class="fas fa-search"></label>
    </form>

    <div class="icons">
        <div id="search-btn" class="fas fa-search"></div>
        <a href="#" class="fas fa-heart"></a>
        <a href="#" class="fas fa-shopping-cart"></a>
        <div id="login-btn" class="fas fa-user"></div>
    </div>

</div>

<div class="header-2">
    <nav class="navbar">
        <a href="#home">home</a>
        <a href="#featured">featured</a>
        <a href="#arrivals">arrivals</a>
    </nav>
</div>

</header>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light sticky-top">
        <div className="container">
          <Link className="navbar-brand" to={""}><img src={logoSoftKare} className="App-logo_SK" alt="logoSK" /></Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="fas fa-user" to={"/sign-in"}></Link>
              </li>
              <li className="nav-item">
                <Link className="fas fa-cart" to={"/sign-up"}></Link>
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
            <Route path="/pdf-reader" component={pdfReader} />
            <Route path="/book-upload" component={bookUpload} />
          </Switch>
        </div>
      </div>

    </div></Router>
  );
}

export default App;
