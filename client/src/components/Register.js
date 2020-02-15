import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import axios from 'axios';
import jwt from 'jsonwebtoken';

function Register(props) {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errorMessage, setErrorMessage ] = useState('');

	const handleRegisterSubmit = async (e) => {
		e.preventDefault();
		if (firstName.length === 0) {
			setErrorMessage('Please enter your first name');
		} else if (lastName.length == 0) {
			setErrorMessage('Please enter your last name');
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			setErrorMessage('Please enter a valid email');
		} else if (password.length < 8 || password.length > 16) {
			setErrorMessage('Please enter a password between 8 and 16 characters');
		} else {
			setErrorMessage('');
			const user = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password
			};
			const userrows = {
				email: email,
				rows: []
			};
			await axios.post('http://localhost:5000/api/userrowsnew', userrows).then((res) => {
				console.log('successfully created user rows');
			});
			await axios.post(`http://localhost:5000/api/users`, user).then((res) => {
				console.log('successfully created user');
				let token = jwt.sign(email, process.env.REACT_APP_SECRET_KEY);
				localStorage.setItem('sectoken', token);
				window.location.href = '/';
			});
		}
	};

	return (
		<div className="register-form">
			<form onSubmit={handleRegisterSubmit}>
				{errorMessage}
				<FormGroup controlId="firstName" bsSize="large">
					<FormLabel>First Name</FormLabel>
					<FormControl
						autoFocus
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</FormGroup>
				<FormGroup controlId="lastName" bsSize="large">
					<FormLabel>Last Name</FormLabel>
					<FormControl type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
				</FormGroup>
				<FormGroup controlId="email" bsSize="large">
					<FormLabel>Email</FormLabel>
					<FormControl type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</FormGroup>
				<FormGroup controlId="password" bsSize="large">
					<FormLabel>Password</FormLabel>
					<FormControl value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
				</FormGroup>
				<Button block bsSize="large" type="submit">
					Register
				</Button>
			</form>
		</div>
	);
}

export default Register;
