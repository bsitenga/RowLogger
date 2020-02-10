import React, { useState, useEffect } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function LoginSmall(props) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errorMessage, setErrorMessage ] = useState('');

	useEffect(() => {
		
	})

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		let allUsers = []
		await axios.get('http://localhost:5000/api/users')
		.then(res => {
			allUsers = res.data;
		})
		let ind = -1;
		for (let i = 0; i < allUsers.length; i++) {
			if (allUsers[i].email === email) {
				ind = i;
			}
		}
		if (ind !== -1 && allUsers[ind].password === password) {
			window.location.href = '/';
		} else {
			setErrorMessage('That email and password combination is incorrect');
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
