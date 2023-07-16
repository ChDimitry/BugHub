import React, { useState, useEffect } from "react";
import solvedBugIcon from "../../../../Assets/Icons/Table/solved.png";
import urgentBugIcon from "../../../../Assets/Icons/Table/urgent.png";
import defaultBugIcon from "../../../../Assets/Icons/Table/default.png";
import axios from "axios";
import { time, date } from "../../../../Common/Time";

function TableRow(props) {
  const [lastEdited, setLastEdited] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const rowClass =
    props.index === props.randomIndex ? "highlight-border-effect" : "";
  const className = [
    props.data.solved ? "solved-bug" : "",
    isOpen ? "clicked" : "",
    rowClass,
  ].join(" ");

  useEffect(() => {
    setIsOpen(props.isAllExpanded);
  }, [props.isAllExpanded]);

  // Decide which icon to use
  let iconSource;
  if (props.data.solved) {
    iconSource = solvedBugIcon;
  } else if (props.data.urgent) {
    iconSource = urgentBugIcon;
  } else {
    iconSource = defaultBugIcon;
  }

  // Handle input changes in the text area
  const handleTextfieldChange = (event) => {
    const { name, value } = event.target;
    if (props.data[name] === value) {
      document.getElementById(
        `bug-edit-button-${props.data.bug_id}`
      ).className = "expanded-row-disabled-button";
    } else {
      const updatedBugData = {
        // Get the data from the form
        reproduction_steps: document.getElementById(
          `reproduction-steps-textarea-${props.data.bug_id}`
        ).value,
        environment: document.getElementById(
          `environment-textarea-${props.data.bug_id}`
        ).value,
        assigneddev: document.getElementById(
          `assigneddev-textarea-${props.data.bug_id}`
        ).value,
        comments: document.getElementById(
          `comments-textarea-${props.data.bug_id}`
        ).value,
        error_stack: document.getElementById(
          `errorstack-textarea-${props.data.bug_id}`
        ).value,
        version: (Number(props.data.version) + 0.1).toFixed(1),
      };
      document.getElementById(
        `bug-edit-button-${props.data.bug_id}`
      ).className = "expanded-row-button highlight-border-effect";
      document.getElementById(`bug-edit-button-${props.data.bug_id}`).onclick =
        () => {
          handleEditBug(updatedBugData);
        };
      return;
    }
  };

  // Handle bug solution changes
  const handleBugSolutionChange = (event) => {
    const { name, value } = event.target;
    // Check if user wrote something
    if (value.length > 0) {
      document.getElementById(
        `bug-solution-button-${props.data.bug_id}`
      ).className = "expanded-row-button highlight-border-effect";
      const updatedBugData = {
        solved: !props.data.solved,
        solution: document.getElementById(
          `solution-textarea-${props.data.bug_id}`
        ).value,
      };
      document.getElementById(
        `bug-solution-button-${props.data.bug_id}`
      ).onclick = () => {
        handleEditBug(updatedBugData);
      };
    } else {
      document.getElementById(
        `bug-solution-button-${props.data.bug_id}`
      ).className = "expanded-row-disabled-button";
    }
  };

  // Handle bug changes
  function handleEditBug(updatedBugData) {
    axios
      .put(`/api/getAllBugs/${props.data._id}`, updatedBugData)
      .then((res) => {
        // Refresh the page
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    const lastEdited = time + " " + date;
    // Save the last edited bug in local storage
    const editedBug = {
      bug_id: props.data.bug_id,
      last_edited: lastEdited,
      type: "last edited",
    };
    localStorage.setItem(props.data.bug_id, JSON.stringify(editedBug));
    setLastEdited(lastEdited);
  }

  // Handle closing the expanded row
  function handleClose() {
    setConfirmRemove(false);
    setIsOpen(!isOpen);
  }

  // Handle bug removal
  function handleRemoveBug() {
    document.getElementById(
      `bug-remove-button-${props.data.bug_id}`
    ).innerHTML = "Confirm";
    document.getElementById(
      `bug-remove-button-${props.data.bug_id}`
    ).style.border = "1px solid #00ffaa";
    document.getElementById(
      `bug-remove-button-${props.data.bug_id}`
    ).className = "highlight-border-effect expanded-row-button";

    // If the user clicks again, remove the bug
    if (confirmRemove) {
      axios
        .delete(`/api/getAllBugs/${props.data._id}`)
        .then((res) => {
          console.log(res.data);
          // Refresh the page
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
      // Remove the bug from local storage
      localStorage.removeItem(props.data.bug_id);
      window.location.reload();
    }
    setConfirmRemove(!confirmRemove);
  }
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

  // Set the collumn span for mobile view
  let collumnSpan = 9;
  if (isMobile) { collumnSpan = 5; }

  return (
    <>
      {/* Add an image next to a row which is new */}

      <tr
        onClick={() => setIsOpen(!isOpen)}
        key={props.data.bug_id}
        className={className}
      >
        {!isMobile ? (
          <td>
            <img src={iconSource} alt="Bug Icon" className="table-icon" />
          </td>
        ) : (
          ""
        )}
        <td>{props.data.bug_id}</td>
        <td>{props.data.project}</td>
        <td>{props.data.severity}</td>
        {!isMobile ? <td>{props.data.urgent ? "Yes" : "No"}</td> : ""}
        <td>{props.data.name}</td>
        {!isMobile ? <td>{props.data.added_by}</td> : ""}
        {!isMobile ? <td>{props.data.version}</td> : ""}
        <td>{props.data.date}</td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan={collumnSpan} className="table-expanded-row">
            <div className="table-expanded-row-content">
              <div className="content-left-column">
                <small className="bug-form-title">_id: {props.data._id}</small>
                <br></br>
                <br></br>
                <span className="bug-form-title">Reproduction Steps</span>
                <textarea
                  style={{ height: "100px" }}
                  disabled={props.data.solved || !props.connectedUser.is_admin}
                  onChange={handleTextfieldChange}
                  id={"reproduction-steps-textarea-" + props.data.bug_id}
                  type="text"
                  onClick={(e) => e.stopPropagation()}
                  placeholder="How to reproduce the bug"
                  name="reproduction_steps"
                >
                  {props.data.reproduction_steps}
                </textarea>
                <br></br>
                <br></br>
                <span className="bug-form-title">Environment</span>
                <textarea
                  disabled={props.data.solved || !props.connectedUser.is_admin}
                  onChange={handleTextfieldChange}
                  id={"environment-textarea-" + props.data.bug_id}
                  type="text"
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Environment"
                  name="environment"
                >
                  {props.data.environment}
                </textarea>
                <br></br>
                <br></br>
                <span className="bug-form-title">Assigned Developer</span>
                <textarea
                  disabled={props.data.solved || !props.connectedUser.is_admin}
                  onChange={handleTextfieldChange}
                  id={"assigneddev-textarea-" + props.data.bug_id}
                  type="text"
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Assigned Developer"
                  name="assigned_dev"
                >
                  {props.data.assigned_dev}
                </textarea>
                <br></br>
                <br></br>
                <span className="bug-form-title">Comments</span>
                <textarea
                  disabled={props.data.solved || !props.connectedUser.is_admin}
                  onChange={handleTextfieldChange}
                  id={"comments-textarea-" + props.data.bug_id}
                  type="text"
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Optional: Comments about the bug"
                  name="comments"
                >
                  {props.data.comments}
                </textarea>
                <br></br>
                <br></br>
              </div>
              <div className="content-right-column">
                <br></br>
                <br></br>
                <span className="bug-form-title">
                  Error Stack / Code Snippet
                </span>
                <textarea
                  disabled={props.data.solved || !props.connectedUser.is_admin}
                  onChange={handleTextfieldChange}
                  spellCheck="false"
                  id={"errorstack-textarea-" + props.data.bug_id}
                  type="text"
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Optional: Thrown error stack OR a code snippet"
                  name="error_stack"
                >
                  {props.data.error_stack}
                </textarea>
                <br></br>
                <br></br>
                <span className="bug-form-title">Solution</span>
                <textarea
                  disabled={props.data.solved}
                  onChange={handleBugSolutionChange}
                  spellCheck="true"
                  id={"solution-textarea-" + props.data.bug_id}
                  type="text"
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Bug solution"
                  name="solution"
                >
                  {props.data.solved ? props.data.solution : ""}
                </textarea>
              </div>
            </div>
            {/* form buttons */}
            <small className="new-bug-input-example-label">
              {/* Retrieve last edited date and time from localStorage */}- Last
              edited:{" "}
              {localStorage.getItem(props.data.bug_id)
                ? JSON.parse(localStorage.getItem(props.data.bug_id))
                    .last_edited
                : "Never"}
            </small>
            <br></br>
            <br></br>
            {props.connectedUser.is_admin && (
              <button
                className="expanded-row-disabled-button"
                // Custom id with the bug id
                id={"bug-edit-button-" + props.data.bug_id}
              >
                Edit Bug
              </button>
            )}

            <button
              className="expanded-row-disabled-button"
              id={"bug-solution-button-" + props.data.bug_id}
            >
              Solve
            </button>
            {props.connectedUser.is_admin && (
              <button
                onClick={handleRemoveBug}
                className="expanded-row-button"
                id={"bug-remove-button-" + props.data.bug_id}
              >
                Remove
              </button>
            )}

            <button onClick={handleClose} className="expanded-row-button">
              Close
            </button>
          </td>
        </tr>
      )}
    </>
  );
}

export default TableRow;
