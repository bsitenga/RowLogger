import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import jwt from "jsonwebtoken";
require("dotenv").config();

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {});

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let allUsers = [];
    await axios.get("https://rowlogger.herokuapp.com/api/users").then((res) => {
      allUsers = res.data;
    });
    let ind = -1;
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email === email) {
        ind = i;
      }
    }
    if (ind !== -1 && allUsers[ind].password === password) {
      let token = jwt.sign(
        allUsers[ind].email,
        process.env.REACT_APP_SECRET_KEY
      );
      localStorage.setItem("sectoken", token);
      window.location.href = "/";
    } else {
      setErrorMessage("That email and password combination is incorrect");
    }
  };

  const goToRegister = () => {
    window.location.href = "/register";
  };

  const goToForgotPassword = () => {
    window.location.href = "/forgotpassword"
  }

  return (
    <div className="loginPage">
      <h1>Sign in to your RowLogger Account</h1>
      <div className="loginForm">
        <Form onSubmit={handleLoginSubmit}>
          {errorMessage}
          <FormGroup controlId="email" bsSize="large">
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="mr-sm-2"
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mr-sm-2"
            />
          </FormGroup>
          <button className="loginPageButton" type="submit">
            Sign In
          </button>
        </Form>
        <div className="forgotPassword" onClick={() => goToForgotPassword()}>
          Forgot Password?
        </div>
        <div className="orLine">or</div>
        {/* TODO: implement Google Sign Up */}
        <div className="registerPageRedirection">
          <p>
            Not a member yet? <span onClick={() => goToRegister()}>Register.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
