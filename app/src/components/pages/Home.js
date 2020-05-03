import React, { Component } from "react";
import AppNav from "../layout/AppNav";
import { Button, Container } from "reactstrap";
import Base from '../auth/Base'

class Home extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }

logout(){
  Base.auth().signOut();
}

  render() {
    return (
      <div>
        <AppNav />
        <Container>
          <Button onClick={this.logout} color="primary">Sign out</Button>
        </Container>
      </div>
    );
  }
}

export default Home;
