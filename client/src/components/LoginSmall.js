import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function LoginSmall() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errorMessage, setErrorMessage ] = useState('');

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		if (!/\S+@\S+\.\S+/.test(email)) {
			setErrorMessage('Please enter a valid email');
		} else if (password.length < 8 || password.length > 16) {
			setErrorMessage('Please enter a password between 8 and 16 characters');
		} else {
			setErrorMessage('');
		}
	};

	return (
		<Form inline onSubmit={handleLoginSubmit}>
			{errorMessage}
            <FormControl type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" className="mr-sm-2" />
            <FormControl type="password"  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" className="mr-sm-2" />
			<Button type="submit">Login</Button>
		</Form>
	);
}

export default LoginSmall;
