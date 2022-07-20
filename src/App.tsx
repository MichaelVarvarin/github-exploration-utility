import React from 'react';
import {TextField, Container} from "@mui/material";
import './App.css';
import {SearchResult} from "./components/SearchResult/SearchResult"
import {useSearch} from "./hooks/useSearch";



function App() {
  const search = useSearch("")

  return (
    <Container
      maxWidth="md"
    >
      <h1>Welcome to Github Exploration Utility</h1>
      <TextField fullWidth
        id="standard-search"
        label="Search repos"
        type="search"
        variant="standard"
        {...search.bind}
      />
      <SearchResult
      searchResult={search.searchResult}/>
    </Container>
  );
}

export default App;
