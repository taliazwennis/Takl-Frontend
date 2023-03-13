import React from "react";

import { useState } from "react";
import axios from "axios";
import "./styles.css";
import Alert from "react-bootstrap/Alert";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [alert, setAlert] = useState("");

  const formatAlert = () => {
    if (alert === "Success") {
      return (
        <Alert key={"success"} variant={"success"}>
          Your registration has been completed successfully!
        </Alert>
      );
    }  else if (alert === "Fail") {
      return (
        <Alert key={"danger"} variant={"danger"}>
          Sorry. Your registration was unsucessful
        </Alert>
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "https://takl-backend.onrender.com/register",
      data: {
        email,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        setRegister(true);
        console.log(result);
        setAlert("Success")
      })
      .catch((error) => {
        error = new Error();
        setAlert("Fail")
      });
  };

  return (
    <div className="login-box">
      <h2>Register</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="user-box">
          <input
            type="text"
            name="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label>Full Name</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <button
          className="button-80"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </form>
      <div className="alert">
        {formatAlert()}
      </div>
    </div>
  );
}
