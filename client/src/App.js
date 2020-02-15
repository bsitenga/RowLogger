import React, { useState, useEffect } from 'react';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Logout from './components/Logout';
import Trends from './components/Trends';
import Home from './components/Home';
import Register from './components/Register';
import LoginSmall from './components/LoginSmall';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';

function App() {

	const getUserEmail = () => {
		return jwt.verify(localStorage.getItem('sectoken'), process.env.REACT_APP_SECRET_KEY)
	}

  const loggedIn = () => {
    return localStorage.getItem('sectoken');
  }

	const loginSwitch = () => {
		if (loggedIn()) {
     return <Nav.Link href="/logout">
								<Link to="/logout">Logout</Link>
							</Nav.Link>
    }
		return <LoginSmall />;
	};

	const homeSwitch = () => {
		if (loggedIn()) {
			return <Home userEmail={getUserEmail()}/>;
		}
		return <Register />
	}

	const trendSwitch = () => {
		if (loggedIn()) {
			return <Trends />;
		}
		return <Register />
	}

	return (
		<Router>
			<div className="App">
				<Navbar bg="light" expand="lg">
					<Navbar.Brand href="/">RowLogger</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="/">
								<Link to="/">Log</Link>
							</Nav.Link>
							<Nav.Link href="/trends">
								<Link to="/trends">Trends</Link>
							</Nav.Link>
							<NavDropdown title="Dropdown" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						{loginSwitch()}
					</Navbar.Collapse>
				</Navbar>

				<Switch>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/trends">
						{trendSwitch()}
					</Route>
					<Route path="/logout">
						<Logout />
					</Route>
					<Route path="/">
						{homeSwitch()}
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
