import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let nav = useNavigate();

  let checkData = (e, props) => {
    e.preventDefault();
    let obj = {
      username: props.user,
      password: props.pass,
    };

    axios
      .post("/checkData", obj)
      .then((response) => {
        if (response.data.token) {
          // Redirect to chat or dashboard
          localStorage.setItem("data", JSON.stringify(response.data.userInfo));
          nav("/chat");
        } else {
          // Invalid credentials
          setUsername("");
          setPassword("");
          alert("Wrong credentials");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  let setUser = (e) => {
    setUsername(e.target.value);
  };
  let setPass = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <div className="loginPage">
        <div className="loginSection">
          <div className="headingSection">
            <h2 className="pageTitle">Login</h2>
          </div>
          <form
            onSubmit={(e) => checkData(e, { user: username, pass: password })}
          >
            <div className="formGroup">
              <label htmlFor="username" className="formLabel">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={setUser}
                className="inputField"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password" className="formLabel">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={setPass}
                className="inputField"
              />
            </div>
            <button type="submit" value="Submit" className="submitButton">
              Login
            </button>
          </form>
          <div className="redirectLink">
            <Link to="/signup" className="signUpLink">
              Don't have an account ?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
