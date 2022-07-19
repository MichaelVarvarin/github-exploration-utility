import React, {useState, useEffect, useDeferredValue} from 'react';
import axios from "axios";

import personalAccessToken from "../config";


async function Search(input: string) {
  if(!input) {
    return {};
  }
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
  const [searchResult, setSearchResult] = useState()

  useEffect(() => {
    async function load() {
      const res = await Search(deferredInput)
      if (!active) {
        return
      }
      setSearchResult(res)
    }

    let active = true
    load()
    return () => { active = false }
  }, [deferredInput])
  return {bind: {value: input,onChange},
  searchResult}
}