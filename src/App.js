import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './css/style.css';
import "./css/App.css";

import logoItReader from './images/itReader_logo_small.png';
import Login from "./pages/Login";
import SignUp from "./pages/Register";
import ResetPass from "./pages/resetPass";
import Profile from "./pages/Profile";
import editProfile from "./pages/editProfile";
import shareBook from "./components/shareBook";
import bookUpload from "./pages/bookUpload";
import bookAdd from "./pages/bookAdd";
import BookListing from "./containers/BookListing";
import adminBookListing from "./containers/adminBookListing";
import epubViewer from "./components/epub_viewer";
import libEPUB from "./containers/library_epub";
import libPDF from "./containers/library_pdf";


function App() {

  const handleProfile = () => {
    if(localStorage.length == 0){
      console.log(localStorage)
      window.location.href = '/sign-in';
    }
    else{
      console.log(localStorage)
      window.location.href = '/profile';
    }
  }
  
  const handleLibrary = () => {
    if(localStorage.length == 0){
      window.location.href = '/sign-in';
    }
    else{
      window.location.href = '/library-epub';
    }
  }

  return (<Router>
    <header className="header">
      <div className="header-1">
        <Link to={"/catalogue"} className="logo"> <img src={logoItReader} width="20" height="20"></img> itReader </Link>
        <div class="icons">
            <a onClick={handleLibrary} class="fas fa-book"></a>
            <a onClick={handleProfile} class="fas fa-user"></a>
        </div>
      </div>
    </header>

    <div className='top-margin'>
    </div>

      <div className="App">      
        <div className="auth">
          <div className="auth">
            <Switch>
              <Route exact path='/' component={BookListing} />
              <Route path="/catalogue" component={BookListing} />
              <Route path="/admin-catalogue" component={adminBookListing} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/reset" component={ResetPass} />
              <Route path="/profile" component={Profile} />
              <Route path="/edit-profile" component={editProfile} />
              <Route path="/share" component={shareBook} />
              <Route path="/book-upload" component={bookUpload} />
              <Route path="/book-add" component={bookAdd} />
              <Route path="/library-epub" component={libEPUB} />
              <Route path="/library-pdf" component={libPDF} />
              <div className='wrapper-grid'>
                <div className='inner-grid'>
                    <Route path="/epub-viewer" component={epubViewer} />
                </div>
              </div>
            </Switch>
          </div>
        </div>
      </div>
      

    </Router>
  );
}

export default App;
