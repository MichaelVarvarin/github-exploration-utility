import React from "react";


export function SearchResults (prop: {searchResults: any}){
  return (
    <div>
      <h3>{JSON.stringify(prop.searchResults)}</h3>
    </div>
  )
  // TODO: find out, how to access fields of this object
}