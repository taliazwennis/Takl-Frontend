import React from "react";
import { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import "./styles.css";
import { BarLoader } from "react-spinners";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Login() {
  const [email, setEmail] = useState("tester@takl.com");
  const [password, setPassword] = useState("password");
  const [login, setLogin] = useState(false);
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatAlert = () => {
    if (alert === "Fail") {
      return (
        <Alert key={"danger"} variant={"danger"}>
          Sorry. Your registration was unsucessful
        </Alert>
      );
    }
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
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
        setIsLoading(false);
        setAlert("Success");
        setLogin(true);
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        window.location.href = `/user/${result.data.userID}`;
      })
      .catch((error) => {
        error = new Error();
        setIsLoading(false);
        setAlert("Fail");
      });
  };

  return (
    <div class="login-box">
      <h2>Login</h2>
      <p>Welcome! You can either sign in using the default account below, or log in with your own account:</p>
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
        {isLoading ? (
          <BarLoader color="#92edd2" />
        ) : (
          <button
            className="button-80"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </button>
        )}
      </form>
      <div className="alert">{formatAlert()}</div>
    </div>
  );
}
