import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Records from "./components/pages/Record";
import Base from "./components/auth/Base";
import Employees from "./components/pages/Employees";
import Statistics from "./components/pages/Statistics";
import Login from './components/pages/Login'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    Base.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.user ? (
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/records" component={Records} />
              <Route exact path="/employees" component={Employees} />
              <Route exact path="/statistics" component={Statistics} />
            </Switch>
          </Router>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default App;
