import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from "axios";
import jwt from "jsonwebtoken";

function Register(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (firstName.length === 0) {
      setErrorMessage("Please enter your first name");
    } else if (lastName.length == 0) {
      setErrorMessage("Please enter your last name");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email");
    } else if (password.length < 8 || password.length > 16) {
      setErrorMessage("Please enter a password between 8 and 16 characters");
    } else {
      setErrorMessage("");
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      const userrows = {
        email: email,
        rows: [],
      };
      await axios
        .post("https://rowlogger.herokuapp.com/api/userrowsnew", userrows)
        .then((res) => {
          console.log("successfully created user rows");
        });
      await axios
        .post(`https://rowlogger.herokuapp.com/api/users`, user)
        .then((res) => {
          console.log("successfully created user");
          let token = jwt.sign(email, process.env.REACT_APP_SECRET_KEY);
          localStorage.setItem("sectoken", token);
          window.location.href = "/";
        });
    }
  };

  return (
    <div className="registerPage">
      <h1>Create your Account</h1>
      <div className="registerForm">
        <form onSubmit={handleRegisterSubmit}>
          {errorMessage}
          <FormGroup controlId="firstName" bsSize="large" className="firstName">
            <FormControl
              autoFocus
              type="text"
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="lastName" bsSize="large" className="lastName">
            <FormControl
              type="text"
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <FormControl
              type="email"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormControl
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="passwordConfirmation" bsSize="large">
            <FormControl
              value={passwordConfirmation}
              placeholder="Confirm Password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              type="password"
            />
          </FormGroup>
          <Button block bsSize="large" type="submit" className="signupButton">
            Sign Up
          </Button>
        </form>
        <div className="orLine">
          or
        </div>
		{/* TODO: implement Google Sign Up */}
		<div className="loginPageRedirection">
			<p>Already a member? <span>Login.</span></p>
		</div>
		<div className="ToSLine">
			<p>By signing up you agree to RowLogger's <span>Terms of Service</span> and <span>Privacy Policy</span></p>
		</div>
      </div>
    </div>
  );
}

export default Register;
