import React, { useState } from "react";
import DropDown from "./Parts/Dropdown";
import DataTable from "./Parts/Table/DataTable";
import "./Style/DataView.css";

function DataView(props) {
  const [resetDropDown, setResetDropDown] = useState(false);
  const [searchValues, setSearchValues] = useState({
    inputTextValue: "",
    dropDownUrgentValue: "Urgent",
    dropDownSeverityValue: "Severity",
    dropDownWhenValue: "When",
  });

  const handleDropDownChange = (name, value) => {
    setSearchValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setResetDropDown(false);
  };

  const handleSearchChange = (event) => {
    setSearchValues({
      inputTextValue: event.target.value,
      dropDownUrgentValue: "Urgent",
      dropDownSeverityValue: "Severity",
      dropDownWhenValue: "When",
    });
    setResetDropDown(true);
  };

  const handleReset = () => {
    setSearchValues({
      inputTextValue: "",
      dropDownUrgentValue: "Urgent",
      dropDownSeverityValue: "Severity",
      dropDownWhenValue: "When",
    });
    setResetDropDown(true);
    document.getElementById("bug-search").value = "";
  };

  return (
    <>
      <div className="searchbar">
        <input
          onChange={handleSearchChange}
          id="bug-search"
          type="text"
          placeholder="Search bugs"
          results="0"
          name="bug-search"
        />
        <DropDown
          id="severity"
          isReset={resetDropDown}
          placeholder="Severity"
          content={["High", "Medium", "Low"]}
          onValueChange={(value) =>
            handleDropDownChange("dropDownSeverityValue", value)
          }
          name="severity"
        />
        <DropDown
          id="urgent"
          isReset={resetDropDown}
          placeholder="Urgent"
          content={["Yes", "No"]}
          onValueChange={(value) =>
            handleDropDownChange("dropDownUrgentValue", value)
          }
          name="urgent"
        />
        {/* <DropDown
          id="when"
          placeholder="When"
          isReset={resetDropDown}
          content={["Yesterday", "Last Week", "Last Month"]}
          onValueChange={(value) =>
            handleDropDownChange("dropDownWhenValue", value)
          }
          name="when"
        /> */}
        <button className="searchbar-reset-button" onClick={handleReset}>
          Reset Query
        </button>
      </div>
      <DataTable
        database_bugList={props.database_bugList}
        searchQuery={[
          searchValues.dropDownSeverityValue,
          searchValues.dropDownUrgentValue,
          searchValues.dropDownWhenValue,
          searchValues.inputTextValue.toLowerCase(),
        ]}
        connectedUser={props.connectedUser}
      />
      <small className="new-bug-input-example-label">
        Sorted by{" "}
        {searchValues.dropDownUrgentValue === "Urgent"
          ? ""
          : searchValues.dropDownUrgentValue === "Yes"
          ? "Urgent"
          : "Non Urgent"}{" "}

        {searchValues.dropDownSeverityValue === "Severity"
          ? ""
          : searchValues.dropDownSeverityValue + " Severity"}

        {searchValues.dropDownSeverityValue === "Severity" &&
        searchValues.dropDownUrgentValue === "Urgent"
          ? searchValues.inputTextValue !== ""
            ? " bug names containing '" + searchValues.inputTextValue + "'"
            : " bug ID"
          : " bugs"}
      </small>
      
    </>
  );
}

export default DataView;
