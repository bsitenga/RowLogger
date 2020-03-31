import React, { useState, useEffect } from 'react';
import Register from './Register';

function FrontPage(props) {
    const goToRegister = () => {
        window.location.href = '/register';
    }

	return (
		<div className = "frontPage">
            <div className = "firstPageFront">
                first page
                <img src = "" />
            </div>
            <div className = "secondPageFront">
                second page
            </div>
            <div className = "thirdPageFront">
                third page
            </div>
            <div className = "footerPageFront">
                footer
            </div>
        </div>
	);
}

export default FrontPage;
