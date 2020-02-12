import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Logout() {
    localStorage.removeItem('sectoken');
    window.location.href = '/';
	return (
		<div>
			Logging out...
		</div>
	);
}

export default Logout;
