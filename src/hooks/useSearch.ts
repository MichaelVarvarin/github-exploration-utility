import React, {useState, useEffect, useDeferredValue} from 'react';
import axios from "axios";

import useDebounce from "./useDebounce";
import personalAccessToken from "../config";

async function search(input: string) {
  if(!input) {
    return {};
  }
  const response = await axios({
    method: "get",
    url: "https://api.github.com/search/repositories",
    headers: {"Accept": "application/vnd.github+json", "Authorization": `token ${personalAccessToken}`},
    params: {q: input}
  }).catch(console.error);
  return JSON.parse(response?.request.response);
}

export function useSearch(initialState: string){
  const [input, setInput] = useState(initialState);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }
  const debouncedInput = useDebounce(input, 350);
  const [searchResult, setSearchResult] = useState({})

  useEffect(() => {
    search(debouncedInput).then(result =>{
      setSearchResult(result);
      });
  }, [debouncedInput])
  return {bind: {value: input,onChange},
    searchResult
  }
}