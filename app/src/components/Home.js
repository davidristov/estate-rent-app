import React, { Component } from "react";
import AppNav from "./AppNav";
import app from "./firebase-auth/base";
import { Button, Container } from "reactstrap";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <AppNav />
        <Container><Button color="primary" onClick={() => app.auth().signOut()}>Sign out</Button></Container>
        
      </div>
    );
  }
}

export default Home;
