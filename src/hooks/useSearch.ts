import React, {useState, useEffect, useDeferredValue} from 'react';
import axios from "axios";

import personalAccessToken from "../config";


async function Search(input: string) {
  if(!input) return {};
  console.log("Search called")
  try {
    const response = await axios({
      method: "get",
      url: "https://api.github.com/search/repositories",
      headers: {"Accept": "application/vnd.github+json", "Authorization": `token ${personalAccessToken}`},
      params: {q: input}
    });
    return JSON.parse(response.request.response);
  } catch (error) {
    console.error(error);
  }
}

export function useSearch(initialState: string){
  const [input, setInput] = useState(initialState);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }
  const deferredInput = useDeferredValue(input);
  const [searchResults, setSearchResults] = useState()

  useEffect(() => {
    let active = true
    load()
    return () => { active = false }

    async function load() {
      setSearchResults(undefined) // this is optional
      const res = await Search(deferredInput)
      if (!active) { return }
      setSearchResults(res)
    }
  }, [deferredInput])
  return {bind: {value: input,onChange},
  searchResults}
}