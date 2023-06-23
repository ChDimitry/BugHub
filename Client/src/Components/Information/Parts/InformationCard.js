import React from "react";

function InformationCard(props) {
  // Generate a random gradient
  const colors = [
    randomColorWithOpacity(),
    randomColorWithOpacity()
  ];
  
  function randomColorWithOpacity(opacity) {
    const red = Math.floor(Math.random() * 155);
    const green = Math.floor(Math.random() * 155);
    const blue = Math.floor(Math.random() * 155) / 1.4;
    return `rgba(${red}, ${green}, ${blue}, 0.4)`;
  }
  
  const gradient = "linear-gradient(to bottom right, " + colors.join(", ") + ")";
  
  // Apply the gradient as the background style
  const style = {
    background: gradient,
  };

  // Return the div element with the gradient background
  return (
    <>
      <div style={style} className="information-card">
        <span className="number-of-bugs-label">
          {props.numberOfBugs}
          <br></br>
        </span>
        {/* Print the category of the information card */}
        {props.category === "total" && "Total"}
        {props.category === "high" && "High Severity"}
        {props.category === "medium" && "Medium Severity"}
        {props.category === "low" && "Low Severity"}
        {props.category === "solved" && "Solved"}
        {props.category === "urgent" && "Urgent"}
      </div>
    </>
  );
}

export default InformationCard;
