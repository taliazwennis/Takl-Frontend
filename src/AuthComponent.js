import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import "./styles.css"

const cookies = new Cookies();

export default function AuthComponent() {
  const token = cookies.get("TOKEN");
  const [message, setMessage] = useState("");

  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    window.location.href = "/";
  }
  
  useEffect(() => {
    const configuration = {
      method: "get",
      url: "https://takl-backend.onrender.com/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(configuration)
      .then((result) => {
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  return (
    <div>
      <h1 className="text-center">Auth Component</h1>
      <h3 className="text-center text-danger">{message}</h3>
      <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
