import React, { useState, useEffect } from "react";
import Register from "./Register";

function FrontPage(props) {
  const goToRegister = () => {
    window.location.href = "/register";
  };

  return (
    <div className="frontPage">
      <div className="home">
        <h1>
          Logging Workouts.{" "}
          <span style={{ color: "#e85a4f" }}>Reinvented.</span>
        </h1>
        <div className="homeDescriptionContainer">
          <section>
            <p className="homeDescription">
              RowLogger is an intuitive platform designed to help rowers log
              their workouts. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
              viverra maecenas accumsan lacus vel facilisis.
            </p>
            <button className="signupButton" onClick={() => goToRegister()}>
              Sign up
            </button>
            <button className="loginButton">Login</button>
            <p className="appLinkFull">
              or <span className="appLink">get the app</span>
            </p>
          </section>
          <img src="RowerLogv2.png" className="homeXLImg homeImg"></img>
          <img src="RowerLogv2.png" className="homeLargeImg homeImg"></img>
        </div>
      </div>
      <div className="secondary">
        {/* TODO: Add Team Block, Add responsive single line design for mobile */}
        <div className="rowerBlock">
          <img src="RowerBlockImage.png"></img>
          <div className="rowerDescription">
            <h3>ROWERS</h3>
            <h2>Log And Organize Your Workouts</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
          </div>
        </div>
        <div className="coachBlock">
          <div className="coachDescription">
            <h3>COACHES</h3>
            <h2>Track Your Rowers' Progress</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisias.
            </p>
            <p style={{color: "#999"}}>Coming Soon!</p>
          </div>
          <img src="RowerBlockImage.png"></img>
        </div>
      </div>
      <div className="footer">
        <div className="footerContent">
          <h3>RowLogger</h3>
          <p>About us</p>
          <p>Mobile App</p>
          <p>Privacy</p>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;


