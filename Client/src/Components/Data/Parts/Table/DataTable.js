import React, { useState, useEffect } from "react";
import NewTableRow from "./NewTableRow";
import TableRow from "./TableRow";
import axios from "axios";

function DataTable(props) {
  const [addNewBugRow, setAddNewBugRow] = useState(false);
  const [isAllExpanded, setAllIsExpanded] = useState(false);
  const [databaseBugList, setDatabaseBugList] = useState(
    props.database_bugList
  );
  const [randomIndex, setRandomIndex] = useState(null);

  useEffect(() => {
    setRandomIndex(0);
  }, [props.database_bugList]);

  useEffect(() => {
    setDatabaseBugList(props.database_bugList);
    // Check if the bug list isn't empty
    if (databaseBugList.length > 0) {
      // Perform filter action when the search query list changes

      let sortedList = [...databaseBugList];
      // Sort by ID
      sortedList.sort((bug1, bug2) => {
        return bug1.bug_id - bug2.bug_id;
      });
      // If the text query is empty, sort the list by severity and urgency
      if (props.searchQuery[3] === "") {
        sortedList.sort((bug1, bug2) => {
          // Map severity values to numerical values for sorting
          let severityValues = {};
          if (props.searchQuery[0] === "High") {
            severityValues = { high: 0, medium: 1, low: 2 };
          } else if (props.searchQuery[0] === "Medium") {
            severityValues = { medium: 0, high: 1, low: 2 };
          } else if (props.searchQuery[0] === "Low") {
            severityValues = { low: 0, medium: 1, high: 2 };
          }
          const severityA = severityValues[bug1.severity.toLowerCase()];
          const severityB = severityValues[bug2.severity.toLowerCase()];

          // Map urgency values to numerical values for sorting
          let urgencyValues = {};
          if (props.searchQuery[1] === "Yes") {
            urgencyValues = { yes: 0, no: 1 };
          } else if (props.searchQuery[1] === "No") {
            urgencyValues = { no: 0, yes: 1 };
          }
          const urgentA = urgencyValues[bug1.urgent ? "yes" : "no"];
          const urgentB = urgencyValues[bug2.urgent ? "yes" : "no"];

          if (severityA < severityB) {
            return -1;
          } else if (severityA > severityB) {
            return 1;
          } else {
            // If severity is the same, sort by urgency
            if (urgentA < urgentB) {
              return -1;
            } else if (urgentA > urgentB) {
              return 1;
            } else {
              return 0;
            }
          }
        });
      } else {
        // Sort by bug name
        sortedList.sort((bug1, bug2) => {
          const name1 = bug1.name.toLowerCase();
          const name2 = bug2.name.toLowerCase();
          if (
            name1.includes(props.searchQuery[3]) &&
            !name2.includes(props.searchQuery[3])
          ) {
            return -1; // bug1 should come before bug2
          } else if (
            !name1.includes(props.searchQuery[3]) &&
            name2.includes(props.searchQuery[3])
          ) {
            return 1; // bug2 should come before bug1
          } else {
            return 0; // maintain the existing order
          }
        });
      }
      setDatabaseBugList(sortedList);
    }
  }, [props.searchQuery]);

  // Create a list of table rows
  let tableRowList = databaseBugList.map((bug, index) => {
    // Check if the bug's project is in the connected user's projects_list
    if (
      props.connectedUser &&
      props.connectedUser.projects_list &&
      props.connectedUser.projects_list.some(
        (project) => project.project_name === bug.project
      )
    ) {
      return (
        <TableRow
          connectedUser={props.connectedUser}
          key={bug.bug_id}
          data={bug}
          isAllExpanded={isAllExpanded}
          index={index}
          randomIndex={randomIndex}
        />
      );
    }
  });

  function handleExpandAll() {
    if (!isAllExpanded) {
      setAllIsExpanded(!isAllExpanded);
    }
  }

  function handleCollapseAll() {
    if (isAllExpanded) {
      setAllIsExpanded(!isAllExpanded);
    }
  }

  function handleRandomize() {
    if (databaseBugList.length > 1) {
      const randomIndex = Math.floor(Math.random() * databaseBugList.length);
      const randomItem = databaseBugList[randomIndex];
      const newList = [
        ...databaseBugList.slice(0, randomIndex),
        ...databaseBugList.slice(randomIndex + 1),
      ];
      setDatabaseBugList([randomItem, ...newList]);
      setRandomIndex(0);
    }
  }
  // Cancel the new bug row
  const handleCancelClick = () => {
    setAddNewBugRow(false);
  };

  // Get new bug from the NewBugRow componen
  const handleNewBug = (newBug) => {
    // Add the new bug to the database
    // Send a POST request to the route to add data to the database
    axios
      .post("/api/addBug", newBug)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // Refresh the page
    window.location.reload();
  };

  // Handle table sorting by id
  function handleSortById() {
    let sortedList = [...databaseBugList];
    sortedList.sort((bug1, bug2) => {
      return bug1.bug_id - bug2.bug_id;
    });
    setDatabaseBugList(sortedList);
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

  return (
    <>
      <div className="table-buttons-bar">
        <button
          id="randomize-button"
          className="table-menu-button"
          onClick={databaseBugList.length > 0 ? handleRandomize : null}
        >
          Random Bug
        </button>
        {props.connectedUser.is_admin && !isMobile && (
          <button
            id="add-new-bug-button"
            className="table-menu-button"
            onClick={() => setAddNewBugRow(!addNewBugRow)}
          >
            {addNewBugRow ? "Cancel New" : "Open New"}
          </button>
        )}

        <button
          id="expand-all-button"
          className="table-menu-button"
          onClick={handleExpandAll}
        >
          Expand All
        </button>
        <button
          id="collapse-all-button"
          className="table-menu-button"
          onClick={handleCollapseAll}
        >
          Collapse All
        </button>
        <button
          id="sort-table-button"
          className="table-menu-button"
          onClick={handleSortById}
        >
          Sort Table
        </button>
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              {!isMobile ? <th className="icon"></th> : ""}
              <th className="id">ID</th>
              <th className="project">Project</th>
              <th className="severity">Severity</th>
              {!isMobile ? <th className="urgent">Urgent</th> : ""}
              <th className="bugname">Bug Name</th>
              {!isMobile ? <th className="added-by">Added By</th> : ""}
              {!isMobile ? <th className="version">Version</th> : ""}
              <th className="date">Date</th>
            </tr>
          </thead>
          <tbody>
            {addNewBugRow && (
              <NewTableRow
                databaseBugList={props.database_bugList}
                onCancelClick={handleCancelClick}
                onAddBug={handleNewBug}
                connectedUser={props.connectedUser}
              />
            )}
            {tableRowList}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DataTable;
