import React from "react";
import { Link } from "react-router-dom";

let Home = () => {
  return (
    <>
      <div className="container">
        <div className="main">
          <div className="header">
            <h1 className="headerHeading">Welcome to WhatsApp Web</h1>
            <p className="headerSubtext">
              Chat with your friends anytime, anywhere!
            </p>
          </div>
          <div className="authentication">
            <div className="authLink">
              <h2 className="authHeading">
                Get started by signing up or logging in:
              </h2>
            </div>
          </div>
          <div className="linksSection">
            <Link to="/signup" className="signupLink">
              <button className="signupButton">Sign Up</button>
            </Link>
            <Link to="/login" className="loginLink">
              <button className="loginButton">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
