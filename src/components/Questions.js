import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Questions({ category }) {
  const { setResult } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [correct, setCorrect] = useState([]);
  const [id, setId] = useState(0);
  const [ans, setAns] = useState("");
  const [givenAns, setGivenAns] = useState([]);
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);
  const [disableOption, setDisableOption] = useState(false);
  const [skipQue, setSkipQue] = useState([]);
  const [active, setActive] = useState(false);

  let score;

  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`
      )
      .then((res) => {
        setData(res.data.results);
        // console.log(res.data.results);
        setCorrect(res.data.results.map((data) => data.correct_answer));
        document.querySelector(".preload").style.display = "none";
        document.querySelector(".quiz-box").style.display = "block";
      })
      .catch((err) => {
        console.error(err);
      });
  }, [category]);

  const next = (e) => {
    if (id === 9) {
      e.target.disabled = true;
    } else if (id !== 9) {
      e.target.disabled = false;
    }

    if (id === 8) {
      document.querySelector(".finish").style.display = "inline-block";
      document.querySelector(".skip").style.display = "none";
    }
    if (id < 9) {
      setId(id + 1);
    }
    setDisable(true);
    setGivenAns((prevState) => [...prevState, ans]);
    setActive(true);
    setDisableOption(false);
    // const arr = skipQue.filter((elem) => elem !== id);
    // console.log(arr);
    // setSkipQue(arr);
  };

  const previous = (e) => {
    if (id === 9) {
      document.querySelector(".skip").style.display = "inline-block";
      document.querySelector(".finish").style.display = "none";
    }
    if (id === 0) {
      e.target.disabled = true;
    } else {
      e.target.disabled = false;
    }
    if (id > 0) {
      setId(id - 1);
    }

    if (skipQue.includes(id-1)) {
      console.log("options will not be disabled");
      setDisableOption(false);
    } else {
      setDisableOption(true);
      console.log("options will be disabled");
    }

    // setDisableOption(true);
    // setDisableOption(true);
    setDisable(false);
  };

  const skip = (e, id) => {
    setSkipQue((prevState) => [...prevState, id]);
    if (id === 9) {
      e.target.disabled = true;
    } else {
      e.target.disabled = false;
    }
    if (id < 9) {
      setId(id + 1);
    }
  };

  const handleClick = (e) => {
    setAns(e.target.value);
    setDisable(false);
  };

  return (
    <div className="container">
      <div className="preload">
        <img src={require("./Loader.gif")} alt="logo" />
      </div>
      <div className="quiz-box">
        <div className="heading">
          <p>{data && data[0].category}</p>
          <h1>Question {id + 1}/10</h1>
          <progress id="file" value={(id + 1) * 10} max="100"></progress>
        </div>

        <div className="question" id={id}>
          {data && data[id].question}
        </div>
        <div className="options">
          <button
            value={data && data[id].correct_answer}
            className={
              ans === (data && data[id].correct_answer)
                ? "active option"
                : "option"
            }
            onClick={handleClick}
            disabled={disableOption === true ? true : false}
          >
            {data && data[id].correct_answer}
          </button>
          <button
            value={data && data[id].incorrect_answers[0]}
            className={
              ans === (data && data[id].incorrect_answers[0])
                ? "active option"
                : "option"
            }
            onClick={handleClick}
            disabled={disableOption === true ? true : false}
          >
            {data && data[id].incorrect_answers[0]}
          </button>
          <button
            className={
              ans === (data && data[id].incorrect_answers[1])
                ? "active option"
                : "option"
            }
            value={data && data[id].incorrect_answers[1]}
            onClick={handleClick}
            disabled={disableOption === true ? true : false}
          >
            {data && data[id].incorrect_answers[1]}
          </button>
          <button
            className={
              ans === (data && data[id].incorrect_answers[2])
                ? "active option"
                : "option"
            }
            value={data && data[id].incorrect_answers[2]}
            onClick={handleClick}
            disabled={disableOption === true ? true : false}
          >
            {data && data[id].incorrect_answers[2]}
          </button>
        </div>
        <div className="btn">
          <div>
            <button
              className="next-prev"
              onClick={previous}
              disabled={id === 0 ? true : false}
            >
              Previous
            </button>
            <button
              className="next-prev"
              onClick={next}
              disabled={disable === true ? true : false}
            >
              Next
            </button>
          </div>
          <div>
            <button
              className="next-prev skip"
              onClick={(e) => skip(e, id)}
              disabled={id === 9 ? true : false}
            >
              Skip{" "}
            </button>
            <button
              className="next-prev finish"
              onClick={() => {
                navigate("/result");
                score = correct.filter((value) => givenAns.includes(value));
                setResult(score.length);
              }}
            >
              Finish{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
