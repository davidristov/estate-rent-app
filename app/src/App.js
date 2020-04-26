import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Records from "./components/pages/Record";

import Employees from "./components/pages/Employees";
import Statistics from "./components/pages/Statistics";

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/records" component={Records} />
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/statistics" component={Statistics} />
        </Switch>
      </Router>
    );
  }
}

export default App;
