import React from "react";
import { format } from "date-fns";

// Get the time of today
const current = new Date();
const time =
  current.getHours() +
  ":" +
  (current.getMinutes() >= 10
    ? current.getMinutes()
    : "0" + current.getMinutes());

const date =
  (current.getDate() >= 10 ? current.getDate() : "0" + current.getDate()) +
  "/" +
  (current.getMonth() + 1
    ? current.getMonth() + 1
    : "0" + (current.getMonth() + 1)) +
  "/" +
  current.getFullYear();

function Calendar(props) {
  const maxBugs = 4;
  const currentMonth = current.getMonth() + 1;
  const months = [
    { month: "Jan", monthNumber: "1" },
    { month: "Feb", monthNumber: "2" },
    { month: "Mar", monthNumber: "3" },
    { month: "Apr", monthNumber: "4" },
    { month: "May", monthNumber: "5" },
    { month: "Jun", monthNumber: "6" },
    { month: "Jul", monthNumber: "7" },
    { month: "Aug", monthNumber: "8" },
    { month: "Sep", monthNumber: "9" },
    { month: "Oct", monthNumber: "10" },
    { month: "Nov", monthNumber: "11" },
    { month: "Dec", monthNumber: "12" },
  ];

  const bugCounts = [];
  for (let i = 1; i <= 12; i++) {
    let count = 0;
    // Activate a function for each month
    (function (month) {
      // Count the number of bugs in the month
      for (let j = 0; j < props.database_bugList.length; j++) {
        var date = props.database_bugList[j].date.split("/");
        const bugDate = new Date(date[2], date[1] - 1, date[0]);
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };

        const formattedDate = bugDate
          .toLocaleDateString("en-GB", options)
          .split("/")
          .join("/");

        if (
          formattedDate.split("/")[1] === month.toString() &&
          props.connectedUser.projects_list &&
          props.connectedUser.projects_list.some(
            (project) => project.project_name === props.database_bugList[j].project
          )
        ) {
          count++;
        }
      }
    })(i < 10 ? "0" + i : i);
    bugCounts.push(count);
  }

  return (
    <>
      <div className="calendar">
        {bugCounts.map((count, index) => (
          <div key={index} className="month">
            <div className="bugs">
              {[...Array(count <= maxBugs ? count : maxBugs)].map((j, i) => (
                <div key={i} className="bug">
                  <small className="bug-calender-extra-bugs-label">
                    {count <= maxBugs ? "" : i - 1 === -1 ? "+" : ""}
                    {i - 1 === -1
                      ? count <= maxBugs
                        ? ""
                        : count - maxBugs
                      : ""}
                  </small>
                </div>
              ))}
            </div>
            <div
              style={
                index + 1 === currentMonth
                  ? { color: "white", fontWeight: 400 }
                  : {}
              }
              className="month-name"
            >
              {months[index].month}
            </div>
          </div>
        ))}
      </div>
      <div className="calendar-information">
        <div className="bug" style={{ marginLeft: "5px" }} />
        <small className="information-label">New Bug</small>
      </div>
    </>
  );
}

export default Calendar;
