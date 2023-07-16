import React, { useState, useEffect } from "react";
import "./Styles/App.css";
import UpperBar from "./Components/Header/UpperBar";
import DataView from "./Components/Data/DataView";
import InformationView from "./Components/Information/InformationView";
import LoginView from "./Components/Login/LoginView";
import UserView from "./Components/User/UserView";
import axios from "axios";

function App() {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const [bugs, setBugs] = useState([]);
  useEffect(() => {
    axios
      .get("/api/getAllBugs")
      .then((response) => setBugs(response.data))
      .catch((error) => console.error(error));
  }, []);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("/api/getAllUsers")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Handle connected user
  const [connectedUser, setConnectedUser] = useState(null);
  const updateConnectedUser = (user) => {
    setConnectedUser(user);
    localStorage.setItem("connectedUser", JSON.stringify(user));
  };
  // Check if there is a connected user in local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("connectedUser");
    if (storedUser) {
      setConnectedUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle mobile view
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint to fit your mobile screen size
    };
    handleResize(); // Call the function on initial render
    window.addEventListener("resize", handleResize); // Add event listener for window resize
    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener on component unmount
    };
  }, []);


  return (
    <div className="App">
      <div className="main-content">
        {!connectedUser && (
          <LoginView
            updateConnectedUser={updateConnectedUser}
            database_userList={users}
          />
        )}
        {connectedUser && (
          <>
            <UpperBar
              updateConnectedUser={updateConnectedUser}
              connectedUser={connectedUser}
            />
            {!isMobile ? (
              <InformationView
                database_bugList={bugs}
                connectedUser={connectedUser}
              />
            ) : (
              ""
            )}
            <UserView database_userList={users} connectedUser={connectedUser} />
            <DataView database_bugList={bugs} connectedUser={connectedUser} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
