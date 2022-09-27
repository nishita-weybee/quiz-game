import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Question from "./Question";

function QuizPage() {
  const { category, setResult } = useContext(UserContext);
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [id, setId] = useState(0);
  const [ans, setAns] = useState(null);
  const [ansDetails, setAnsDetails] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`
      )
      .then((res) => {
        setData(res.data.results);
        console.log(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onNextClick = () => {
    const i = ansDetails.findIndex((ansDetail) => ansDetail.id === id);
    if (i <= -1) {
      let score;
      if (ans === data[id].correct_answer) {
        score = 1;
      } else {
        score = 0;
      }
      setAnsDetails([
        ...ansDetails,
        { id: id, ans: ans, score: Number(score) },
      ]);
    }
    if (id !== 9) {
      setId(id + 1);
    } else {
      alert("Click on Finish to submit");
    }
  };

  const onFinishClick = () => {
    let result = ansDetails.reduce((acc, val) => {
      return acc + val.score;
    }, 0);
    setResult(result);
    navigate("/result");
  };

  return (
    <div className="container">

      {!data ? (
        <div className="preload">
          <img src={require("./loading-unscreen.gif")} alt="logo" />
        </div>
      ) : (
        <div className="quiz-box">
          <>
            <div className="heading">
              <p>{data[0].category}</p>
              <h1>Question {id + 1}/10</h1>
              <progress id="file" value={(id + 1) * 10} max="100"></progress>
            </div>
            <Question
              data={data}
              id={id}
              setAns={setAns}
              ans={ans}
              ansDetails={ansDetails}
              options={[...data[id].incorrect_answers, data[id].correct_answer]}
            />
            <div className="btn">
              <div>
                <button
                  // disabled={id === 9 ? true : false}
                  onClick={onNextClick}
                  className="next-prev"
                >
                  Next
                </button>
                <button
                  disabled={id === 0 ? true : false}
                  onClick={() => setId(id - 1)}
                  className="next-prev"
                >
                  Previous
                </button>
              </div>
              <div>
                {id === 9 ? (
                  <button onClick={onFinishClick} className="next-prev finish">
                    Finish
                  </button>
                ) : (
                  <button
                    onClick={() => setId(id + 1)}
                    className="next-prev skip"
                  >
                    Skip
                  </button>
                )}
              </div>
            </div>
          </>
        </div>
      )}
    </div>
  );
}

export default QuizPage;

// import axios from "axios";
// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../App";
// import Question from "./Question";

// function QuizPage() {
//   const { category, setResult } = useContext(UserContext);

//   const [data, setData] = useState(null);
//   const [id, setId] = useState(0);
//   const [ans, setAns] = useState(null);
//   const [ansDetails, setAnsDetails] = useState([]);

//   useEffect(() => {
//     axios
//       .get(
//         `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`
//       )
//       .then((res) => {
//         setData(res.data.results);
//         console.log(res.data.results);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, []);

//   const onNextClick = () => {
//     const i = ansDetails.findIndex((ansDetail) => ansDetail.id === id);
//     if (i <= -1) {
//       let score;
//       if (ans === data[id].correct_answer) {
//         score = 1;
//       } else {
//         score = 0;
//       }
//       setAnsDetails([...ansDetails, { id: id, ans: ans, score: score }]);
//     }

//     setId(id + 1);
//   };

//   return (
//     <div className="container">
//       <div className="quiz-box">
//         {data && (
//           <>
//             <div className="heading">{data && data[0].category}</div>
//             <Question
//               data={data}
//               id={id}
//               setAns={setAns}
//               ans={ans}
//               ansDetails={ansDetails}
//               options={[...data[id].incorrect_answers, data[id].correct_answer]}
//             />

//             <button disabled={id === 9 ? true : false} onClick={onNextClick}>
//               Next
//             </button>
//             <button
//               disabled={id === 0 ? true : false}
//               onClick={() => setId(id - 1)}
//             >
//               Previous
//             </button>
//             {id === 9 ? (
//               <button onClick={() => console.log("finish")}>Finish</button>
//             ) : (
//               <button onClick={() => setId(id + 1)}>Skip</button>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default QuizPage;
