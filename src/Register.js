import React from "react";
import { BarLoader } from "react-spinners";

import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import Alert from "react-bootstrap/Alert";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatAlert = () => {
    if (alert === "Success") {
      return (
        <Alert key={"success"} variant={"success"}>
          Your registration has been completed successfully! Please login in
        </Alert>
      );
    } else if (alert === "Fail") {
      return (
        <Alert key={"danger"} variant={"danger"}>
          Sorry. Your registration was unsucessful
        </Alert>
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        setIsLoading(false);
        setAlert("Success");
      })
      .catch((error) => {
        error = new Error();
        setIsLoading(false);
        setAlert("Fail");
      });
  };

  return (
    <div className="login-box">
      <h2>Register</h2>
      <p>
        Don't have an account? Simply fill in your details below to create an
        account and sign up
      </p>
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

        {isLoading ? (
          <BarLoader color="#92edd2" />
        ) : (
          <button
            className="button-80"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        )}
      </form>
      <div className="alert">{formatAlert()}</div>
    </div>
  );
}
