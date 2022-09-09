import React, { useState, createContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Questions from "./components/Questions";
import Result from "./components/Result";
import NoMatch from "./components/NoMatch";

export const UserContext = createContext();

function App() {
  const arr = [
    "Sports",
    "Celebrities",
    "Science & Nature",
    "Animals",
    "History",
    "General Knowledge",
  ];

  const [topic, setTopic] = useState("Sports");
  const [category, setCategory] = useState(21);
  const [result, setResult] = useState();

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

  const [selectedItem, setSelectedItem] = useState(null);
  const [spin, setSpin] = useState(true);

  const selectItem = () => {
    if (spin === false) return false;
    if (spin === true) {
      if (selectedItem === null) {
        const selectedItem = Math.floor(Math.random() * arr.length);

        setTopic(arr[selectedItem]);

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
  // console.log(category);
  return (
    <div className="App">
      <UserContext.Provider value={{ result, setResult }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                arr={arr}
                selectedItem={selectedItem}
                selectItem={selectItem}
              />
            }
          ></Route>
          <Route
            path="questions"
            element={<Questions category={category} />}
          ></Route>
          <Route path="result" element={<Result />}></Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
