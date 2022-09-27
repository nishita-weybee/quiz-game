import React from "react";
import SpinWheel from "./SpinWheel";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1 className="home-heading">Spin the Wheel</h1>
      <SpinWheel />
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
