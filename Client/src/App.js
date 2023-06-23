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

  // Mock data
  // const bugs = [
  //   {
  //     _id: "6449590924fdad8cefe6fd4d",
  //     bug_id: 2,
  //     project: "Project 1",
  //     severity: "High",
  //     urgent: false,
  //     name: "Screen is black",
  //     added_by: "Omer",
  //     version: "2.1",
  //     date: "22/01/2023",
  //     solved: false,
  //     reproduction_steps: "1. Open the app\n2. Click on the screen",
  //     environment: "Windows 10",
  //     assigned_dev: "Dima",
  //     comments: "This bug is extremely annoying!",
  //     error_stack:
  //       "java.lang.NullPointerException at com.example.myproject.Book.getTitle(Book.java:16) at com.example.myproject.Author.getBookTitles(Author.java:25) at com.example.myproject.Bootstrap.main(Bootstrap.java:14)",
  //   },
  //   {
  //     _id: "5fc49e6d45f2aeb223d8d8e2",
  //     bug_id: 7,
  //     project: "Project 2",
  //     severity: "Medium",
  //     urgent: true,
  //     name: "Login button not working",
  //     added_by: "Sarah",
  //     version: "1.2",
  //     date: "12/05/2023",
  //     solved: false,
  //     reproduction_steps:
  //       "1. Visit the login page\n2. Click on the login button",
  //     environment: "Chrome",
  //     assigned_dev: "John",
  //     comments: "Investigating the issue.",
  //     error_stack: "TypeError: Cannot read property 'handleLogin' of undefined",
  //   },
  //   {
  //     _id: "6fe29e13b1e5421cc1dd0e84",
  //     bug_id: 12,
  //     project: "Project 3",
  //     severity: "Low",
  //     urgent: false,
  //     name: "Incorrect data displayed in table",
  //     added_by: "Alex",
  //     version: "3.0",
  //     date: "03/01/2023",
  //     solved: true,
  //     reproduction_steps:
  //       "1. Open the table view\n2. Scroll down to see incorrect data",
  //     environment: "Firefox",
  //     assigned_dev: "Emma",
  //     comments: "Bug fixed in the latest release.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "3b4a8c5e2df20a1bfb271e78",
  //     bug_id: 5,
  //     project: "Project 1",
  //     severity: "Medium",
  //     urgent: false,
  //     name: "Error message not displaying",
  //     added_by: "Mike",
  //     version: "2.3",
  //     date: "18/02/2023",
  //     solved: false,
  //     reproduction_steps:
  //       "1. Trigger the error condition\n2. Observe the lack of error message",
  //     environment: "Windows 7",
  //     assigned_dev: "Linda",
  //     comments: "Looking into the issue.",
  //     error_stack: "TypeError: Cannot read property 'displayError' of null",
  //   },
  //   {
  //     _id: "e92b7490e226491628ac04e7",
  //     bug_id: 9,
  //     project: "Project 2",
  //     severity: "High",
  //     urgent: true,
  //     name: "Application freezes randomly",
  //     added_by: "Tom",
  //     version: "1.8",
  //     date: "09/03/2023",
  //     solved: false,
  //     reproduction_steps:
  //       "1. Use the application for some time\n2. Observe random freezes",
  //     environment: "macOS 10.15",
  //     assigned_dev: "Kate",
  //     comments: "This issue needs immediate attention.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "0d7e24b41012612d2ae46221",
  //     bug_id: 3,
  //     project: "Project 1",
  //     severity: "Low",
  //     urgent: false,
  //     name: "Incorrect color of the submit button",
  //     added_by: "Alex",
  //     version: "2.0",
  //     date: "05/04/2023",
  //     solved: true,
  //     reproduction_steps:
  //       "1. Visit the form page\n2. Observe the color of the submit button",
  //     environment: "Safari",
  //     assigned_dev: "Emma",
  //     comments: "Fixed in the latest update.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "cc034ffaf9a75b8999d33fd1",
  //     bug_id: 6,
  //     project: "Project 3",
  //     severity: "Medium",
  //     urgent: false,
  //     name: "Missing data in the exported CSV file",
  //     added_by: "Mike",
  //     version: "2.5",
  //     date: "14/03/2023",
  //     solved: false,
  //     reproduction_steps:
  //       "1. Export data to CSV\n2. Check the generated file for missing data",
  //     environment: "Windows 10",
  //     assigned_dev: "Linda",
  //     comments: "Investigating the issue.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "f3e6f88a35e4c938cdaef79a",
  //     bug_id: 8,
  //     project: "Project 2",
  //     severity: "High",
  //     urgent: true,
  //     name: "Data corruption on saving",
  //     added_by: "John",
  //     version: "1.5",
  //     date: "23/02/2023",
  //     solved: false,
  //     reproduction_steps: "1. Make changes to the data\n2. Save the changes",
  //     environment: "Ubuntu 20.04",
  //     assigned_dev: "Sarah",
  //     comments: "Critical issue. Need to investigate immediately.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "6d0ccde8367ae2c18411f8d6",
  //     bug_id: 1,
  //     project: "Project 1",
  //     severity: "Low",
  //     urgent: false,
  //     name: "Incorrect formatting of the date",
  //     added_by: "Tom",
  //     version: "2.1",
  //     date: "01/04/2023",
  //     solved: true,
  //     reproduction_steps: "1. View the date on the details page",
  //     environment: "Chrome",
  //     assigned_dev: "Dima",
  //     comments: "Fixed in the latest release.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "ec38f124eab1e8c1180a5a0d",
  //     bug_id: 4,
  //     project: "Project 2",
  //     severity: "Medium",
  //     urgent: false,
  //     name: "Images not loading in the gallery",
  //     added_by: "Sarah",
  //     version: "1.3",
  //     date: "10/03/2023",
  //     solved: true,
  //     reproduction_steps:
  //       "1. Open the gallery page\n2. Observe the missing images",
  //     environment: "Firefox",
  //     assigned_dev: "John",
  //     comments: "Resolved the issue by optimizing image loading.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "299a7cfd632242144ed87b47",
  //     bug_id: 10,
  //     project: "Project 3",
  //     severity: "High",
  //     urgent: true,
  //     name: "Application crashes on startup",
  //     added_by: "Alex",
  //     version: "3.2",
  //     date: "19/02/2023",
  //     solved: false,
  //     reproduction_steps: "1. Launch the application",
  //     environment: "Windows 7",
  //     assigned_dev: "Emma",
  //     comments: "Investigating the cause of the crash.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "f8830b5c04db155dbd2c2f27",
  //     bug_id: 11,
  //     project: "Project 1",
  //     severity: "Medium",
  //     urgent: false,
  //     name: "Search functionality not working",
  //     added_by: "Mike",
  //     version: "2.3",
  //     date: "06/03/2023",
  //     solved: false,
  //     reproduction_steps:
  //       "1. Enter a search query\n2. Observe no results or incorrect results",
  //     environment: "macOS 11.2",
  //     assigned_dev: "Linda",
  //     comments: "Looking into the issue.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "ff9c09a1d6d2720c0f171734",
  //     bug_id: 15,
  //     project: "Project 2",
  //     severity: "Low",
  //     urgent: false,
  //     name: "Inconsistent font size in the header",
  //     added_by: "John",
  //     version: "1.7",
  //     date: "28/02/2023",
  //     solved: true,
  //     reproduction_steps: "1. Open the header on different pages",
  //     environment: "Ubuntu 18.04",
  //     assigned_dev: "Sarah",
  //     comments: "Resolved by applying consistent styling.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "768c0d5b8a3a82a77b0e0a96",
  //     bug_id: 14,
  //     project: "Project 1",
  //     severity: "High",
  //     urgent: true,
  //     name: "Invalid input crashes the form",
  //     added_by: "Tom",
  //     version: "2.2",
  //     date: "17/02/2023",
  //     solved: false,
  //     reproduction_steps: "1. Enter invalid input\n2. Submit the form",
  //     environment: "Chrome",
  //     assigned_dev: "Dima",
  //     comments: "Critical issue. Investigating the cause of the crash.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "b258a395f6fb08684e3a383d",
  //     bug_id: 13,
  //     project: "Project 2",
  //     severity: "Medium",
  //     urgent: false,
  //     name: "Incorrect sorting of data in the table",
  //     added_by: "Sarah",
  //     version: "1.4",
  //     date: "24/02/2023",
  //     solved: true,
  //     reproduction_steps:
  //       "1. Sort the table by a specific column\n2. Observe incorrect sorting",
  //     environment: "Firefox",
  //     assigned_dev: "John",
  //     comments: "Fixed the sorting algorithm to resolve the issue.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "98196495327d02a19b7b7763",
  //     bug_id: 18,
  //     project: "Project 3",
  //     severity: "Low",
  //     urgent: false,
  //     name: "Missing validation for email field",
  //     added_by: "Alex",
  //     version: "3.1",
  //     date: "08/03/2023",
  //     solved: false,
  //     reproduction_steps: "1. Submit the form without entering an email",
  //     environment: "Windows 10",
  //     assigned_dev: "Emma",
  //     comments: "Adding validation logic to the email field.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "064d76e3807efec7369e2e64",
  //     bug_id: 16,
  //     project: "Project 1",
  //     severity: "High",
  //     urgent: true,
  //     name: "Application crashes when opening a specific file",
  //     added_by: "Mike",
  //     version: "2.4",
  //     date: "02/03/2023",
  //     solved: false,
  //     reproduction_steps: "1. Open the specific file",
  //     environment: "macOS 10.14",
  //     assigned_dev: "Linda",
  //     comments: "Investigating the cause of the crash.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "3a251ed48811b5940a343098",
  //     bug_id: 17,
  //     project: "Project 2",
  //     severity: "Medium",
  //     urgent: false,
  //     name: "Incorrect alignment of text in the footer",
  //     added_by: "John",
  //     version: "1.6",
  //     date: "15/02/2023",
  //     solved: true,
  //     reproduction_steps: "1. Scroll down to the footer",
  //     environment: "Ubuntu 20.04",
  //     assigned_dev: "Sarah",
  //     comments: "Fixed the alignment issue in the latest release.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "2dd0fe37a9a87ef3a6e8dbf0",
  //     bug_id: 21,
  //     project: "Project 1",
  //     severity: "Low",
  //     urgent: false,
  //     name: "Tooltip not displaying on hover",
  //     added_by: "Tom",
  //     version: "2.3",
  //     date: "20/02/2023",
  //     solved: true,
  //     reproduction_steps: "1. Hover over the tooltip-triggering element",
  //     environment: "Chrome",
  //     assigned_dev: "Dima",
  //     comments: "Tooltip behavior fixed in the latest release.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "a132b6e05d8a3a31e35a314e",
  //     bug_id: 19,
  //     project: "Project 2",
  //     severity: "High",
  //     urgent: true,
  //     name: "Application crashes when saving large files",
  //     added_by: "Sarah",
  //     version: "1.9",
  //     date: "13/02/2023",
  //     solved: false,
  //     reproduction_steps: "1. Attempt to save a large file",
  //     environment: "Windows 7",
  //     assigned_dev: "John",
  //     comments: "Investigating the cause of the crash.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "8f1b3b66e3cc987c01e111e3",
  //     bug_id: 20,
  //     project: "Project 3",
  //     severity: "Medium",
  //     urgent: false,
  //     name: "Invalid characters in the input field",
  //     added_by: "Mike",
  //     version: "2.6",
  //     date: "26/02/2023",
  //     solved: false,
  //     reproduction_steps: "1. Enter invalid characters in the input field",
  //     environment: "Ubuntu 18.04",
  //     assigned_dev: "Linda",
  //     comments: "Adding input validation logic to prevent invalid characters.",
  //     error_stack: "None",
  //   },
  //   {
  //     _id: "68937255f2b1106a9c66ff8e",
  //     bug_id: 25,
  //     project: "Project 1",
  //     severity: "Medium",
  //     urgent: false,
  //     name: "Dropdown menu not functioning properly",
  //     added_by: "Alex",
  //     version: "2.2",
  //     date: "04/03/2023",
  //     solved: false,
  //     reproduction_steps: "1. Click on the dropdown menu",
  //     environment: "Firefox",
  //     assigned_dev: "Emma",
  //     comments: "Investigating the issue.",
  //     error_stack: "None",
  //   },
  // ];

  // const users = [
  //   {
  //     _id: "9834789502fdad8cefe6fe5e",
  //     user_id: 1,
  //     username: "Dima",
  //     password: "1234",
  //     first_name: "Dima",
  //     last_name: "Chudnovsky",
  //     is_connected: false,
  //     is_admin: true,
  //     projects_list: [
  //       {
  //         project_name: "Project 1",
  //         projects_team: [{
  //           "9834789502fdad8cefe6fe5e" : "Dima",
  //           "9834789502fdad8cefe6fe51": "John",
  //         }],
  //         created_by: "Dima",
  //         description: "This is a project description",
  //         num_of_bugs: 9,
  //       },
  //       {
  //         project_name: "Project 2",
  //         projects_team: [{
  //           "9834789502fdad8cefe6fe5e" : "Dima",
  //           "9834789502fdad8cefe6fe53": "Omer",
  //         }],
  //         created_by: "Dima",
  //         description : "This is a description of project 2",
  //         num_of_bugs: 8,
  //       },
  //     ],
  //   },
  //   {
  //     _id: "9834789502fdad8cefe6fe53",
  //     user_id: 2,
  //     username: "Omer",
  //     password: "1234",
  //     first_name: "Omer",
  //     last_name: "Sommerstein",
  //     is_connected: false,
  //     is_admin: true,
  //     projects_list: [
  //       {
  //         project_name: "Project 2",
  //         projects_team: [{
  //           "9834789502fdad8cefe6fe5e" : "Dima",
  //           "9834789502fdad8cefe6fe53": "Omer",
  //         }],
  //         created_by: "Dima",
  //         description : "This is a description of project 2",
  //         num_of_bugs: 8,
  //       },
  //       {
  //         project_name: "Project 3",
  //         projects_team: [{
  //           "9834789502fdad8cefe6fe53": "Omer",
  //           "9834789502fdad8cefe6fe51": "John",
  //         }],
  //         created_by: "Omer",
  //         description : "This is a description of project 3",
  //         num_of_bugs: 7,
  //       },
  //     ],
  //   },
  //   {
  //     _id: "9834789502fdad8cefe6fe51",
  //     user_id: 2,
  //     username: "User",
  //     password: "1234",
  //     first_name: "John",
  //     last_name: "Doe",
  //     is_connected: false,
  //     is_admin: false,
  //     projects_list: [
  //       {
  //         project_name: "Project 1",
  //         projects_team: [{
  //           "9834789502fdad8cefe6fe5e" : "Dima",
  //           "9834789502fdad8cefe6fe51": "John",
  //         }],
  //         created_by: "Dima",
  //         description : "This is a description of project 1",
  //         num_of_bugs: 9,
  //       },
  //       {
  //         project_name: "Project 3",
  //         projects_team: [{
  //           "9834789502fdad8cefe6fe53": "Omer",
  //           "9834789502fdad8cefe6fe51": "John",
  //         }],
  //         created_by: "Omer",
  //         description : "This is a description of project 3",
  //         num_of_bugs: 7,
  //       },
  //     ],
  //   },
  // ];

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
