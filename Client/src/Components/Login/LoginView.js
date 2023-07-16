import React, { useState, useEffect } from "react";
import "./Style/Login.css";
import { el } from "date-fns/locale";

// Get the time of today
const current = new Date();
const time =
  current.getHours() +
  ":" +
  (current.getMinutes() >= 10
    ? current.getMinutes()
    : "0" + current.getMinutes());

const date = current.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function LoginView(props) {
  const [connectedUser, setConnectedUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  // Update state when input values change
  const handleUsernameChange = (e) => {
    if (!usernameRegex.test(e.target.value)) {
      document.getElementById("username").style.outline = "2px solid red";
    } else {
      document.getElementById("username").style.outline = "1px solid #00ffaa";
    }
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    if (!passwordRegex.test(e.target.value)) {
      document.getElementById("password").style.outline = "2px solid red";
    } else {
      document.getElementById("password").style.outline = "1px solid #00ffaa";
    }
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Compare the username and password with the database
    const user = props.database_userList.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      // If the user is valid, set the user as connected
      const updatedUserList = props.database_userList.map((u) => {
        if (u.username === user.username) {
          return { ...u, is_connected: true };
        }
        return u;
      });

      setConnectedUser(user);
      props.updateConnectedUser(user);
      // Update the database
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
          />
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          <div className="button-container">
            <button onClick={handleFormSubmit} className="table-menu-button">
              Login
            </button>
          </div>
        </div>
        {/* Validation Rules */}
        <div className="validation-rules-box">
          <h3>Username Rules</h3>
          <ul>
            <li>Must be between 4 and 16 characters long</li>
            <li>Can only contain letters, numbers and underscores</li>
          </ul>
          <h3>Password Rules</h3>
          <ul>
            <li>Must be at least 8 characters long</li>
            <li>Must contain at least one uppercase letter</li>
            <li>Must contain at least one lowercase letter</li>
            <li>Must contain at least one number</li>
            <li>Must contain at least one special character</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default LoginView;
