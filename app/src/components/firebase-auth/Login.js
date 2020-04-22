import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import { Button } from "reactstrap";
import { MDBInput } from "mdbreact";
import "../../style/Login.css";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div class="grandParentContaniner">
      <div class="parentContainer">
        <form onSubmit={handleLogin} className="form">
          <div className="grey-text">
            <MDBInput
              className="input1"
              name="email"
              type="email"
              label="Type your email"
              icon="envelope"
              validate
              error="wrong"
              success="right"
            />
            <MDBInput
              name="password"
              type="password"
              label="Type your password"
              icon="lock"
              validate
            />
          </div>
          <div className="text-center">
            <Button color="primary">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
