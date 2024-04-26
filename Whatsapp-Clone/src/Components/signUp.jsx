import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [fullName, setFullname] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let nav = useNavigate();

  let sendData = (e, props) => {
    e.preventDefault();
    let obj = {
      name: props.name,
      username: props.user,
      password: props.pass,
    };
    axios
      .post("../../addUser", obj)
      .then((response) => {
        if (response.data !== "") {
          nav("/signUp");
          setUsername("");
          setPassword("");
          setFullname("");
          alert("UserName should be unique");
        } else {
          nav("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let setUser = (e) => {
    setUsername(e.target.value);
  };
  let setPass = (e) => {
    setPassword(e.target.value);
  };

  let setName = (e) => {
    setFullname(e.target.value);
  };

  return (
    <div className="signUpPage">
      <div className="signUpSection">
        <div className="headingSection">
          <h2 className="pageTitle">SignUp</h2>
        </div>
        <form
          onSubmit={(e) =>
            sendData(e, { user: userName, name: fullName, pass: password })
          }
        >
          <div className="formGroup">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={setName}
              className="inputField"
            />
          </div>
          <div className="formGroup">
            <input
              type="text"
              name="username"
              placeholder="Email or Username"
              value={userName}
              onChange={setUser}
              className="inputField"
            />
          </div>
          <div className="formGroup">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={setPass}
              className="inputField"
            />
          </div>
          <button type="submit" value="Submit" className="submitButton">
            Submit
          </button>
        </form>
        <div className="redirectLink">
          <Link to="/login" className="loginLink">
            Already have an account ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
