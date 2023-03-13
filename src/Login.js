import React from "react";
import { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import "./styles.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [alert, setAlert] = useState("");

  const formatAlert = () => {
    if (alert === "Success") {
      return (
        <Alert key={"success"} variant={"success"}>
          Your registration has been completed successfully!
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
    const configuration = {
      method: "post",
      url: "https://takl-backend.onrender.com/login",
      data: {
        email,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        setAlert("Success");
        console.log("Login: ", result);
        setLogin(true);
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        window.location.href = "/auth";
      })
      .catch((error) => {
        error = new Error();
        setAlert("Fail");
      });
  };

  return (
    <div class="login-box">
      <h2>Login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div class="user-box">
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Username</label>
        </div>
        <div class="user-box">
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
          class="button-80"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </button>
      </form>
      <div className="alert">{formatAlert()}</div>
    </div>
  );
}
