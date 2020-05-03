import React, { Component } from "react";
import Base from "../auth/Base";
import "../../style/pages/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: "",
      password: "",
    };
  }

  login(e) {
    e.preventDefault();
    Base.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div class="box">
        <div id="header">
          <h1 id="logintoregister">Admin login</h1>
        </div>
        <form action="" method="post">
          <div class="group">
            <input
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              name="email"
              class="inputMaterial"
              placeholder="Enter email"
              required
            />
            <span class="highlight"></span>
            <span class="bar"></span>
          </div>
          <div class="group">
            <input
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
              class="inputMaterial"
              placeholder="Password"
              required
            />
            <span class="highlight"></span>
            <span class="bar"></span>
          </div>
          <button id="buttonlogintoregister" type="submit" onClick={this.login}>
            Login
          </button>
        </form>
        <div id="footer-box"></div>
      </div>
    );
  }
}

export default Login;
