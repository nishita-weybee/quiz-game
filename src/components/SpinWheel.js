import React, { useState } from "react";
import "../SpinWheel.css";

function SpinWheel(props) {
  // const [selectedItem, setSelectedItem] = useState(null);
  const { items, selectedItem, selectItem } = props;

  // const selectItem = () => {
  //   if (spin === false) return false;
  //   if (spin === true)
  //   {if (selectedItem === null) {
  //     const selectedItem = Math.floor(Math.random() * items.length);
  //     console.log(selectedItem);
  //     if (onSelectItem) {
  //       onSelectItem(selectedItem);
  //     }
  //     setSelectedItem(selectedItem);
  //   } else {
  //     setSelectedItem(null);
  //     setTimeout(selectItem, 500);
  //   }
  //   setSpin(false)}
  // };

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
