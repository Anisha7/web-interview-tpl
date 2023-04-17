import React from "react";
import logo from "./logo.svg";
import gametimelogo from "./gametimelogo.png";
import { SearchBar } from "./features/search/SearchBar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={gametimelogo} className="logo" alt="image" />
        <SearchBar />
      </header>
    </div>
  );
}

export default App;
