import React from "react";

function Question(props) {
  const { data, id, setAns, options, ansDetails } = props;

  const onOptionClick = (value) => {
    const i = ansDetails.findIndex((ansDetail) => ansDetail.id === id);
    if (i <= -1) {
      setAns(value);
    }
  };

  return (
    <>
      <div className="question">{data[id].question}</div>
      <div className="options">
        {options.length > 0 &&
          options.map((option, i) => {
            return (
              <button
                key={i}
                className={
                  ansDetails.some((ansDetail) => ansDetail.ans === option)
                    ? "active option"
                    : "option"
                }
                onClick={() => {
                  onOptionClick(option);
                }}
              >
                {option}
              </button>
            );
          })}
      </div>
    </>
  );
}

export default Question;

// import React from "react";

// function Question(props) {
//   const { data, id, setAns, options, ansDetails } = props;

//   const onOptionClick = (value) => {
//     const i = ansDetails.findIndex((ansDetail) => ansDetail.id === id);
//     if (i <= -1) {
//       setAns(value);
//     }
//   };

//   return (
//     <>
//       <div className="question">{data[id].question}</div>
//       <div className="options">
//         {options.length > 0 &&
//           options.map((option, i) => {
//             return (
//               <button
//                 key={i}
//                 className={"option"}
//                 onClick={() => {
//                   onOptionClick(option);
//                 }}
//               >
//                 {option}
//               </button>
//             );
//           })}
//       </div>
//     </>
//   );
// }

// export default Question;
