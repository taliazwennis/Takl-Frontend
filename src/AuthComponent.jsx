import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import NoteArea from "./NoteArea";
import NavBar from "./NavBar";
import "./styles.css";

const cookies = new Cookies();

export default function AuthComponent() {
  const token = cookies.get("TOKEN");
  const [message, setMessage] = useState("");

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
      <NavBar />
      <NoteArea />
    </div>
  );
}
