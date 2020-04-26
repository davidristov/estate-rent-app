import React, { Component } from "react";
import AppNav from "../layout/AppNav";
import { Button, Container } from "reactstrap";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <AppNav />
        <Container>
          <Button color="primary">Sign out</Button>
        </Container>
      </div>
    );
  }
}

export default Home;
