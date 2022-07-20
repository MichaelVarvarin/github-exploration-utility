import React from "react";

type Props = {
  searchResult: any;
}

export function SearchResult (props: Props){
  const {searchResult} = props;
  return (
    <div>
      <h3>{JSON.stringify(searchResult)}</h3>
    </div>
  )
}