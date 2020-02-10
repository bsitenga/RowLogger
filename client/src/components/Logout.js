import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Logout() {
    localStorage.removeItem('sectoken');
    window.location.href = '/';
	return (
		<div>
			Logging out...
            {window.location.href = '/'}
		</div>
	);
}

export default Logout;
