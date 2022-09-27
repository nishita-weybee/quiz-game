import React, { useState, useContext } from "react";

import "../SpinWheel.css";
import { UserContext } from "../App";

const items = [
  "Sports",
  "Celebrities",
  "Science & Nature",
  "Animals",
  "History",
  "General Knowledge",
];

function SpinWheel() {
  const { setCategory } = useContext(UserContext);
  
  const [spin, setSpin] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const onSelectItem = (topic) => {
    switch (topic) {
      case 0:
        setCategory(21);
        break;

      case 1:
        setCategory(26);
        break;

      case 2:
        setCategory(17);
        break;

      case 3:
        setCategory(27);
        break;

      case 4:
        setCategory(23);
        break;

      case 5:
        setCategory(9);
        break;

      default:
        break;
    }
  };

  const selectItem = () => {
    if (spin === false) return false;
    if (spin === true) {
      if (selectedItem === null) {
        const selectedItem = Math.floor(Math.random() * items.length);
        if (onSelectItem) {
          onSelectItem(selectedItem);
        }
        setSelectedItem(selectedItem);
      } else {
        setSelectedItem(null);
        setTimeout(selectItem, 500);
      }
      setSpin(false);
    }
  };

  const wheelVars = {
    "--nb-item": items.length,
    "--selected-item": selectedItem,
  };

  const spinning = selectedItem !== null ? "spinning" : "";

  return (
    <div className="wheel-container">
      <div
        className={`wheel ${spinning}`}
        style={wheelVars}
        onClick={selectItem}
      >
        {items.map((item, index) => (
          <div
            className="wheel-item"
            key={index}
            style={{ "--item-nb": index }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpinWheel;
