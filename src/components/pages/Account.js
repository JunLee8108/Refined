import React, { useState } from "react";
import "./Account.css";

function Account() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="account-container">
      <div className="account-nav">
        <button
          onClick={() => setActiveTab("login")}
          className={activeTab === "login" ? "active" : ""}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab("signup")}
          className={activeTab === "signup" ? "active" : ""}
        >
          Sign Up
        </button>
        <button
          onClick={() => setActiveTab("forgot")}
          className={activeTab === "forgot" ? "active" : ""}
        >
          Forgot Password
        </button>
      </div>
      {activeTab === "login" && (
        <div className="login-form">
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
        </div>
      )}
      {activeTab === "signup" && (
        <div className="signup-form">
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <button>Sign Up</button>
        </div>
      )}
      {activeTab === "forgot" && (
        <div className="forgot-form">
          <input type="text" placeholder="Email" />
          <button>Reset Password</button>
        </div>
      )}
    </div>
  );
}

export default Account;
