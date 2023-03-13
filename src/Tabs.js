import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import "./styles.css"
 
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const handleSignup = () => {
    setActiveTab("signup");
  };
  const handleLogin = () => {
    setActiveTab("login");
  };
  return (
    <div className="Tabs">
      <ul className="nav">
        <li
          className={activeTab === "signup" ? "active" : ""}
          onClick={handleSignup}
        >
          Register
        </li>
        <li
          className={activeTab === "login" ? "active" : ""}
          onClick={handleLogin}
        >
          Login
        </li>
      </ul>
 
      <div className="outlet">
        {activeTab === "signup" ? <Register /> : <Login />}
      </div>
    </div>
  );
};
export default Tabs;