import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Result() {
  const navigate = useNavigate();
  const { result } = useContext(UserContext);
  return (
    <>
      <div className="content">
        <div className="RM-heading">Score</div>

        <div className="display-region">
          <h2 id="counter1">{result} / 10 </h2>
        </div>

        <button
          className="btn-reset"
          onClick={() => {
            navigate("/");
          }}
        >
          Play Again
        </button>
      </div>
    </>
  );
}

export default Result;
