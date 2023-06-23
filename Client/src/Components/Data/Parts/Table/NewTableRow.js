import React, { useState } from "react";
import { date } from "../../../../Common/Time";
const mongoose = require("mongoose");

function NewTableRow(props) {
  const [bugListLength, setBugListLength] = useState(
    props.databaseBugList.length
  );
  const [isOpen, setIsOpen] = useState(false);
  // Decide which class to use for the row
  const className = [
    "highlight-border-effect",
    isOpen ? "clicked" : "",
    "table-new-bug-row",
  ].join(" ");

  const handleClick = () => {
    const newBugRow = false;
    props.onCancelClick(newBugRow);
  };

  function handleClearForm() {
    document.getElementById("project-input").value = "";
    document.getElementById("severity-input").value = "Low";
    document.getElementById("urgent-input").value = "No";
    document.getElementById("bugname-input").value = "";
    document.getElementById("addedby-input").value = "";
    document.getElementById("reproduction-steps-textarea-").value = "";
    document.getElementById("environment-textarea").value = "";
    document.getElementById("assigneddev-textarea").value = "";
    document.getElementById("comments-textarea").value = "";
    document.getElementById("errorstack-textarea-").value = "";
  }

  function handleSubmitForm() {
    // Collect the data from the form
    const project = document.getElementById("project-input").value;
    const severity = document.getElementById("severity-input").value;
    const urgent = document.getElementById("urgent-input").value;
    const bugName = document.getElementById("bugname-input").value;

    const reproductionSteps = document.getElementById(
      "reproduction-steps-textarea-"
    ).value;
    const environment = document.getElementById("environment-textarea").value;
    const assigneddev = document.getElementById("assigneddev-textarea").value;
    const comments = document.getElementById("comments-textarea").value;
    const errorStack = document.getElementById("errorstack-textarea-").value;

    // Check if the data is valid
    if (
      project === "" ||
      severity === "" ||
      urgent === "" ||
      bugName === "" ||
      reproductionSteps === "" ||
      environment === "" ||
      assigneddev === "" ||
      comments === ""
    ) {
      alert("Please fill in all the fields!");
      return;
    }

    // Create a new bug object
    const newBug = {
      bug_id:
        bugListLength > 0
          ? props.databaseBugList[props.databaseBugList.length - 1].bug_id + 1
          : 0,
      project: project,
      severity: severity,
      urgent: urgent === "Yes" ? true : false,
      name: bugName,
      added_by: props.connectedUser.username,
      version: "1.0",
      date: date,
      solved: false,
      reproduction_steps: reproductionSteps,
      environment: environment,
      assigned_dev: assigneddev,
      comments: comments,
      error_stack: errorStack,
      solution: "",
    };
    // Add the new bug to the database
    props.onAddBug(newBug);
    // Close the form
    handleClick();
  }

  return (
    <>
      <tr className={className} onClick={() => setIsOpen(!isOpen)}>
        <td id="new-bug-icon"></td>
        <td>
          {bugListLength > 0
            ? props.databaseBugList[props.databaseBugList.length - 1].bug_id + 1
            : 0}
        </td>
        <td>
          {/* <input
            className={isOpen ? "new-bug-input-dark" : ""}
            id="project-input"
            type="text"
            onClick={(e) => e.stopPropagation()}
            placeholder="Project Name"
          ></input> */}
          <select
            id="project-input"
            className={[
              "new-bug-select",
              isOpen ? "new-bug-input-dark" : "",
            ].join(" ")}
            onClick={(e) => e.stopPropagation()}
            placeholder="Project Name"
          >
            {props.connectedUser.projects_list.map((project) => (
              <option value={project.project_name}>{project.project_name}</option>
            ))}

          </select>
        </td>
        <td>
          <select
            id="severity-input"
            className={[
              "new-bug-select",
              isOpen ? "new-bug-input-dark" : "",
            ].join(" ")}
            onClick={(e) => e.stopPropagation()}
            placeholder="Severity"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </td>
        <td>
          <select
            id="urgent-input"
            className={[
              "new-bug-select",
              isOpen ? "new-bug-input-dark" : "",
            ].join(" ")}
            onClick={(e) => e.stopPropagation()}
            placeholder="Urgent"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </td>
        <td>
          <input
            className={isOpen ? "new-bug-input-dark" : ""}
            id="bugname-input"
            type="text"
            onClick={(e) => e.stopPropagation()}
            placeholder="Bug Name"
          ></input>
        </td>
        <td>
          <input
            className={isOpen ? "new-bug-input-dark" : ""}
            id="addedby-input"
            type="text"
            onClick={(e) => e.stopPropagation()}
            placeholder="Added By"
            value={props.connectedUser.username}
          ></input>
        </td>
        <td>1.0</td>
        <td>{date}</td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan="9" className="table-expanded-row">
            <div className="table-expanded-row-content">
              <div className="content-left-column">
                <small className="bug-form-title">_id: ...</small>
                <br></br>
                <br></br>
                Reproduction Steps
                <textarea
                  id="reproduction-steps-textarea-"
                  type="text"
                  onClick={(e) => e.stopPropagation()}
                  placeholder="How to reproduce the bug"
                ></textarea>
                <small className="new-bug-input-example-label">
                  e.g. 1. Open the app 2. Click on the button 3. See the bug
                </small>
                <br></br>
                <br></br>
                Environment
                <textarea
                  id="environment-textarea"
                  type="text"
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Environment where the bug was found"
                ></textarea>
                <small className="new-bug-input-example-label">
                  e.g. Windows 10, Chrome 86.0.4240.198, Eclipse IDE
                </small>
                <br></br>
                <br></br>
                Assigned Developer
                <textarea
                  id="assigneddev-textarea"
                  type="text"
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Developer assigned to the bug"
                ></textarea>
                <br></br>
                <br></br>
                Comments
                <textarea
                  id="comments-textarea"
                  type="text"
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Optional: Comments about the bug"
                ></textarea>
                <small className="new-bug-input-example-label">
                  e.g. This bug is extremely annoying!
                </small>
                <br></br>
                <br></br>
                <small>- Canceling will close the row.</small>
              </div>
              <div className="content-right-column">
                <br></br>
                <br></br>
                Error Stack / Code Snippet
                <textarea
                  id="errorstack-textarea-"
                  type="text"
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Optional: Thrown error stack"
                ></textarea>
                <small className="new-bug-input-example-label">
                  e.g. java.lang.NullPointerException at
                  com.example.myproject.Book.getTitle(Book.java:16) at
                  com.example.myproject.Author.getBookTitles(Author.java:25) at
                  com.example.myproject.Bootstrap.main(Bootstrap.java:14)
                </small>
              </div>
            </div>
            {/* form buttons */}
            <button onClick={handleSubmitForm} className="expanded-row-button">
              Add Bug
            </button>
            <button
              className="expanded-row-button"
              onClick={() => handleClearForm()}
            >
              Clear
            </button>
            <button
              onClick={() => handleClick()}
              className="expanded-row-button"
            >
              Cancel
            </button>
          </td>
        </tr>
      )}
    </>
  );
}

export default NewTableRow;
