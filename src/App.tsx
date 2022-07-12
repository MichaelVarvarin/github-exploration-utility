import React from 'react';
import {TextField} from "@mui/material";
import * as events from "events";
// import logo from './logo.svg';
import './App.css';
import {SearchResults} from "./components/SearchResults/SearchResults"
import {useSearch} from "./hooks/useSearch";



function App() {
  const search = useSearch("")

  return (
    <div className="App">
      <h1>Welcome to Github Exploration Utility</h1>
      <TextField fullWidth
        id="standard-search"
        label="Search repos"
        type="search"
        variant="standard"
        {...search.bind}
      />
      <SearchResults
      searchResults={search.searchResults}/>
    </div>
  );
}

export default App;
