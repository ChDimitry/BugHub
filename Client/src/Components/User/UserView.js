import React, { useState, useEffect } from "react";
import "./Style/UserView.css";
import axios from "axios";
import { set } from "mongoose";

function UserView(props) {
  var [projectList, setProjectList] = useState(
    props.connectedUser.projects_list
  );

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
    <>
      <div className="user-panel">
        <table>
          <thead>
            <tr>
              <th>Your Porjects</th>
              <th>Team</th>
              <th>Created By</th>
              {!isMobile ? <th>Description</th> : ""}
            </tr>
          </thead>
          <tbody>
            {projectList.map((project, index) => (
              <tr key={index}>
                <td>{project.project_name}</td>
                <td>{Object.values(project.projects_team[0]).join(", ")}</td>
                <td>{project.created_by}</td>
                {!isMobile ? <td>{project.description}</td> : ""}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserView;
