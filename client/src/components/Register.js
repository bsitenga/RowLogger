import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

function Register() {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errorMessage, setErrorMessage ] = useState('');

	const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (firstName.length === 0) {
			setErrorMessage('Please enter your first name');
		} else if (lastName.length == 0) {
            setErrorMessage('Please enter your last name');
        } else if (!(/\S+@\S+\.\S+/.test(email))) {
            setErrorMessage('Please enter a valid email');
        } else if (password.length < 8 || password.length > 16) {
            setErrorMessage('Please enter a password between 8 and 16 characters')
        } else {
            setErrorMessage("");
        }
	};

	return (
		<div>
            <div className = "register-form">

            </div>
            <div className = "login-form">

            </div>
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
