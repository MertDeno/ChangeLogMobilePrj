import React from "react";
import { SearchBar } from "react-native-elements";

function SearchBarForCheckboxes(props) {
  function updateSearch(search) {
    props.onSearch(search);
  }

  return (
    <SearchBar
      value={props.value}
      inputStyle={{ backgroundColor: "#fff", borderRadius: 15 }}
      containerStyle={{ backgroundColor: "rgb(247,247,247)" }}
      onChangeText={updateSearch}
      placeholder="Search.."
      lightTheme
      round
      inputContainerStyle={{ backgroundColor: "rgb(247,247,247)" }}
    />
  );
}

export default SearchBarForCheckboxes;
