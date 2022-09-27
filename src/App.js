import React, { createContext, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import QuizPage from "./components/QuizPage";
import Result from "./components/Result";
import NoMatch from "./components/NoMatch";

export const UserContext = createContext();

function App() {
  const [category, setCategory] = useState(21);
  const [result, setResult] = useState();

  return (
    <div className="App">
      <UserContext.Provider
        value={{ result, setResult, category, setCategory }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="questions" element={<QuizPage />} />
          <Route path="result" element={<Result />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
