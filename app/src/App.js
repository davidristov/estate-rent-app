import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/Home";
import Records from "./components/Record";
import { AuthProvider } from "./components/firebase-auth/Auth";
import PrivateRoute from "./components/firebase-auth/PrivateRoute";
import Login from "./components/firebase-auth/Login";
import Employees from './components/Employees'

class App extends Component {
  state = {};
  render() {
    return (
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/records" component={Records} />
            <PrivateRoute exact path="/employees" component={Employees} />
          </Switch>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
