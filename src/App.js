import "./App.css";
import React from "react";
import { useState } from "react";
import axios from "axios";
// search
import Search from "./Search";
//detail
import Detail from "./Detail";

function App() {
  const [state, setState] = useState({
    s: "Sherlock",
    results: [],
    selected: {},
  });

  // API
  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=98ca5c3d";

  const searchInput = (e) => {
    let s = e.target.value;

    setState((prevState) => {
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
  //

  const openDetail = (id) => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closeDetail = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search Any Moview</h1>
      </header>
      <main>
        <Search searchInput={searchInput} search={search} />

        <div className="container">
          {state.results.map((e) => (
            <div className="item" onClick={() => openDetail(e.imdbID)}>
              <img style={{ width: "200px" }} src={e.Poster} />
              <h3 style={{ color: "white" }}>{e.Title}</h3>
            </div>
          ))}
        </div>

        {typeof state.selected.Title != "undefined" ? (
          <Detail selected={state.selected} closeDetail={closeDetail} />
        ) : (
          false
        )}
      </main>
      <h1
        className="git"
        href="https://github.com/Parv-gugnani/Movie-Info-In-React"
      >
        Here
      </h1>
    </div>
  );
}

export default App;
