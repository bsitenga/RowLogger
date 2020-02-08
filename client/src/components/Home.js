import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div>
        <Link to="/register">Register</Link>
    </div>
  );
}

export default Home;