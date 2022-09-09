import React, { useState } from "react";
import SpinWheel from "./SpinWheel";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const navigate = useNavigate();
  const { selectedItem, selectItem, arr } = props;

  return (
    <div className="home">
      <h1 className="home-heading">Spin the Wheel</h1>
      <SpinWheel
        items={arr}
        selectedItem={selectedItem}
        selectItem={selectItem}
      />

      <button
        className="start"
        onClick={() => {
          navigate("questions");
        }}
      >
        Let's GO
      </button>
    </div>
  );
}

export default Home;
