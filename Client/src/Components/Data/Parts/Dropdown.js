import React, { useState, useEffect } from "react";
import { mdiMenuDown } from "@mdi/js";
import Icon from "@mdi/react";

export default function DropDown(props) {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("");

  const handleItemClick = (item) => {
    setValue(item);
    setActive(false);
    props.onValueChange(item); // Call the callback function to pass the value to the parent
  };

  // Reset the dropdown when the reset button is clicked
  useEffect(() => {
    if (props.isReset === true) {
      setActive(false);
      setValue("");
    }
  }, [props.isReset]);

  return (
    <div className={active ? "dropdown_wrapper active" : "dropdown_wrapper"}>
      <span
        onClick={() => {
          setActive(!active);
        }}
      >
        {value ? value : props.placeholder} <Icon path={mdiMenuDown} />
      </span>
      <div className="drop_down">
        <ul>
          {props.content &&
            props.content.map((item, key) => (
              <li onClick={() => handleItemClick(item)} key={key}>
                &nbsp;&nbsp;{item}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
