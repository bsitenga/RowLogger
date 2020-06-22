import React, { useState, useEffect } from "react";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logout from "./components/Logout";
import FullHistory from "./components/FullHistory";
import Home from "./components/Home";
import Register from "./components/Register";
import LoginPage from "./components/LoginPage";
import Analytics from "./components/Analytics";
import FrontPage from "./components/FrontPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import jwt from "jsonwebtoken";

function App() {
  const [logStyle, setLogStyle] = useState("activeLink");
  const [historyStyle, setHistoryStyle] = useState("");
  const [analyticStyle, setAnalyticStyle] = useState("");

  const getUserEmail = () => {
    return jwt.verify(
      localStorage.getItem("sectoken"),
      process.env.REACT_APP_SECRET_KEY || 'SamandDiane'
    );
  };

  const loggedIn = () => {
    return localStorage.getItem("sectoken");
  };

  const loginSwitch = () => {
    if (loggedIn()) {
      return (
        <div id="navRight">
			<NavDropdown title="Profile">
				<NavDropdown.Item><Link to="/logout">Logout</Link></NavDropdown.Item>
			</NavDropdown>
        </div>
      );
    }
  };

  const homeSwitch = () => {
    if (loggedIn()) {
      return <Home userEmail={getUserEmail()} />;
    }
    return <FrontPage />;
  };

  const trendSwitch = () => {
    if (loggedIn()) {
      return <FullHistory userEmail={getUserEmail()} />;
    }
    return <FrontPage />;
  };

  const analyticSwitch = () => {
    if (loggedIn()) {
      return <Analytics userEmail={getUserEmail()} />;
    }
    return <FrontPage />;
  };

  const activeBar = (type) => {
    setLogStyle("");
    setHistoryStyle("");
    setAnalyticStyle("");
    if (type === "log") {
      setLogStyle("activeLink");
    } else if (type === "history") {
      setHistoryStyle("activeLink");
    } else if (type === "analytics") {
      setAnalyticStyle("activeLink");
    }
  };

  const linkSwitches = () => {
    if (loggedIn()) {
      return (
        <Nav id="navbarLinks">
          <Nav.Link href="/">
            <Link to="/" className={logStyle} onClick={() => activeBar("log")}>
              Log
            </Link>
          </Nav.Link>
          <Nav.Link href="/records">
            <Link
              to="/records"
              className={historyStyle}
              onClick={() => activeBar("history")}
            >
              History
            </Link>
          </Nav.Link>
          <Nav.Link href="/analytics">
            <Link
              to="/analytics"
              className={analyticStyle}
              onClick={() => activeBar("analytics")}
            >
              Analytics
            </Link>
          </Nav.Link>
        </Nav>
      );
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar bg="light" id="rowloggernav">
          <Navbar.Brand href="/">
            Row<span style={{ color: "#e85a4f" }}>Logger</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {linkSwitches()}
            {loginSwitch()}
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/records">{trendSwitch()}</Route>
          <Route path="/analytics">{analyticSwitch()}</Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/">{homeSwitch()}</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
