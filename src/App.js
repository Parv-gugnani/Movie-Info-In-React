import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useState } from "react";
import axios from "axios";
// search
//detail

function App() {
  const [state, setstate] = useState({
    s: "Sherlock",
    results: [],
    selected: {},
  });

  // API
  const apiurl = "API_KEY";

  const searchInput = (e) => {
    let s = e.target.value;

    setstate((prevState) => {
      return { ...prevState, s: s };
    });
  };
  //search
  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;

        console.log(results);

        setState((prevState) => {
          return {
            ...prevState,
            results: results,
          };
        });
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">App</header>
    </div>
  );
}

export default App;
