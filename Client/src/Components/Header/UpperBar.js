import React from "react";
import "./Style/Header.css";
import userIcon from "../../Assets/Icons/Header/user.png";

function UpperBar(props) {
  return (
    <div className="upperbar">
      <div className="title-container">
      <h1>BUGHUB</h1>
      </div>
      {/* Server connection status icon */}
      {/* <img src={serverStatusIcon} alt="Server Status" /> */}
      <div className="connected-user-container">
        <small id="connected-user-label">
          Welcome back, <img src={userIcon} id="user-icon"></img> {props.connectedUser.first_name}<br/>

          <button className="clear-button" onClick={() => props.updateConnectedUser(null)}>
            Logout
          </button>
        </small>
      </div>
    </div>
  );
}

export default UpperBar;
