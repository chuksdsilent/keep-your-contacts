import React, { Fragment } from 'react';
import Navbar from './components/layouts/Navbar';
import About from './components/pages/About'
import Home from './components/pages/Home';
import Alert from './components/layouts/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ContactState from './context/contacts/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  return (
    <div className="App">
      <AuthState>
        <ContactState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar />
                <div className="container">
                  <Alert />
                  <Switch>
                    <PrivateRoute Route exact path='/' component={Home} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </AlertState>
        </ContactState>
      </AuthState>
    </div>
  );
}
export default App;
