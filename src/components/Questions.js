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
  let score;

  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`
      )
      .then((res) => {
        setData(res.data.results);
        console.log(res.data.results);
        setCorrect(res.data.results.map((data) => data.correct_answer));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const next = (e) => {
    if (id === 9) {
      e.target.disabled = true;
    } else if (id !== 9) {
      e.target.disabled = false;
    }

    if (id < 9) {
      setId(id + 1);
    }
    setDisable(true);
    setGivenAns((prevState) => [...prevState, ans]);
    console.log(givenAns);
    console.log(correct);
  };

  const previous = (e) => {
    if (id === 0) {
      e.target.disabled = true;
    } else {
      e.target.disabled = false;
    }
    if (id > 0) {
      setId(id - 1);
    }
  };

  const skip = (e) => {
    if (id === 9) {
      e.target.disabled = true;
    } else {
      e.target.disabled = false;
    }
    if(id<9){
      setId( id + 1 )
    }
  }

  const handleClick = (e) => {
    setAns(e.target.value);
    setDisable(false);
  };

  return (
    <div className="container">
      <div className="heading">
        <p>{data && data[0].category}</p>
        <h1>Question {id + 1}/10</h1>
        <progress id="file" value={(id + 1) * 10} max="100"></progress>
      </div>
      <div className="question">{data && data[id].question}</div>
      <div className="options">
        <button
          value={data && data[id].correct_answer}
          className={
            ans === (data && data[id].correct_answer)
              ? "active option"
              : "option"
          }
          onClick={handleClick}
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
          <button className="next-prev" 
          onClick={skip}
          disabled={id === 9 ? true : false}>Skip </button>
          <button
            className="next-prev"
            onClick={() => {
              navigate("/result");
              score = correct.filter((value) => givenAns.includes(value));
              setResult(score.length);
              console.log(score.length);
            }}
          >
            Finish{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Questions;
