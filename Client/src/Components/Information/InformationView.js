import React from "react";
import InformationCard from "./Parts/InformationCard";
import Calendar from "./Parts/Calendar";
import "./Style/Information.css";

function InformationView(props) {
  // Count the number of bugs with a certain severity and if they are solved
  let totalBugs = 0;
  let highAlertBugs = 0;
  let mediumAlertBugs = 0;
  let lowAlertBugs = 0;
  let solvedBugs = 0;
  let urgentBugs = 0;
  props.database_bugList.forEach((bug) => {
    if (
      props.connectedUser.projects_list &&
      props.connectedUser.projects_list.some(
        (project) => project.project_name === bug.project
      )
    ) {
      totalBugs++;
      if (bug.severity === "High" && !bug.solved) {
        highAlertBugs++;
      }
      if (bug.solved) {
        solvedBugs++;
      }
      if (bug.severity === "Low" && !bug.solved) {
        lowAlertBugs++;
      }
      if (bug.severity === "Medium" && !bug.solved) {
        mediumAlertBugs++;
      }
      if (bug.urgent === true && !bug.solved) {
        urgentBugs++;
      }
    }
  });

  return (
    <>
      <div className="informationbar">
        <InformationCard category="total" numberOfBugs={totalBugs} />
        <InformationCard category="high" numberOfBugs={highAlertBugs} />
        <InformationCard category="medium" numberOfBugs={mediumAlertBugs} />
        <InformationCard category="low" numberOfBugs={lowAlertBugs} />
        <InformationCard category="solved" numberOfBugs={solvedBugs} />
        <InformationCard category="urgent" numberOfBugs={urgentBugs} />
      </div>
      <Calendar
        database_bugList={props.database_bugList}
        connectedUser={props.connectedUser}
      />
    </>
  );
}

export default InformationView;
