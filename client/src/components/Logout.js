import React from 'react';

function Logout() {
	localStorage.removeItem('sectoken');
	window.location.href = '/';
	return <div>Logging out...</div>;
}

export default Logout;
