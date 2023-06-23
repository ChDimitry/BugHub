import React, { useState, useEffect } from "react";
import "./Style/UserView.css";
import axios from "axios";
import { set } from "mongoose";

function UserView(props) {
  var [projectList, setProjectList] = useState(
    props.connectedUser.projects_list
  );

  

  return (
    <>
      <div className="user-panel">
        <table>
          <thead>
            <tr>
              <th>Your Porjects</th>
              <th>Team</th>
              <th>Created By</th>
              <th>Description</th>
              <th># of Bugs</th>
            </tr>
          </thead>
          <tbody>
            {projectList.map((project, index) => (
              <tr key={index}>
                <td>{project.project_name}</td>
                <td>{Object.values(project.projects_team[0]).join(", ")}</td>
                <td>{project.created_by}</td>
                <td>{project.description}</td>
                <td>{project.num_of_bugs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserView;
