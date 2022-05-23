import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEdit, faPlay,faShare, faStop, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../src/css/style.css';
import "./App.css";
import { AuthProvider } from "./pages/auth";
import Cookies from 'universal-cookie';
import Header from "./containers/Header";

import logoItReader from './itReader_logo_small.png';
import Login from "./pages/login_comp";
import SignUp from "./pages/signup_comp";
import ResetPass from "./pages/resetPass_comp";
import EmailSent from "./pages/emailSent_comp";
import Profile from "./pages/profile_comp";
import editProfile from "./pages/editProfile_comp";
import pdfReader from "./pages/pdfReader_comp";
import bookUpload from "./pages/book_comp";
import bookInfo from "./pages/book_information";
import BookListing from "./containers/BookListing";
import libEPUB from "./containers/library_epub";
import libPDF from "./containers/library_pdf";


function App() {
  return (<Router>
    <header className="header">
        <div className="header-1">
          <Link className="logo" to={"/catalogue"}> <img src={logoItReader} width="20" height="20"></img> itReader </Link>

          <form action="" class="search-form">
            <input type="search" name="" placeholder="search here..." id="search-box"></input>
            <label for="search-box" class="fas fa-search"></label>
          </form>

        <div class="icons">
            <a href="/library-epub" class="fas fa-book"></a>
            <a href="/sign-in" class="fas fa-user"></a>
        </div>
      </div>
    </header>
      
      <div className='ui grid container'>
      </div>

      <div className="App">      
        <div className="auth">
          <div className="auth">
          <AuthProvider>
            <Switch>
              <Route exact path='/' component={BookListing} />
              <Route path="/catalogue" component={BookListing} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/reset" component={ResetPass} />
              <Route path="/email-sent" component={EmailSent} />
              <Route path="/profile" component={Profile} />
              <Route path="/edit-profile" component={editProfile} />
              <Route path="/book-upload" component={bookUpload} />
              <Route path="/book-info" component={bookInfo} />
              <Route path="/pdf-reader" component={pdfReader} />
              <Route path="/library-epub" component={libEPUB} />
              <Route path="/library-pdf" component={libPDF} />
            </Switch>
          </AuthProvider>
          </div>
        </div>
      </div>

    </Router>
  );
}

export default App;
