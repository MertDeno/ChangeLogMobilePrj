import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Platform, FlatList } from "react-native";
import { CheckBox, SearchBar } from "react-native-elements";
import SearchBarForCheckboxes from "../components/SearchBarForCheckboxes";
import SelectAllCheckbox from "../components/SelectAllCheckbox";
import useChange from "../hooks/use-change";
import useSearch from "../hooks/use-search";
import useSelectAll from "../hooks/use-select-all"; 
import style from '../css/flatlistItem.component.style.js';

function PlantsPage() {
  const[
    [filteredPlants, setFilteredPlants],
    [plants, setPlants],
    [checkedAll, setCheckedAll]
  ] = [useState([]), useState([]), useState(false)]

  const { handleOnChange: handleOnChange } = useChange(setCheckedAll, plants, setPlants, filteredPlants, setFilteredPlants)
  const { handleSelectAll: handleSelectAll } = useSelectAll(checkedAll, setCheckedAll, plants, setPlants, filteredPlants, setFilteredPlants)
  const { searchHandler: plantSearchHandler, searchValue: plantSearchValue } = useSearch(setCheckedAll, plants, setFilteredPlants)

  var baseURL = Platform.OS === "android" ? "http://10.0.2.2:8000/EtWerksSet" : "https://8567-24-133-107-93.eu.ngrok.io/EtWerksSet";
  // : process.env.LINK + "/EtWerksSet";

  const ListViewType = ({ item, index }) => {
    return (
      // Flat List Item
      <CheckBox
        containerStyle={style.flatListItem}
        onPress={() => {handleOnChange(item.Werks)}}
        title={item.Werks + " - " + item.Name1}
        checked={item.checked}
      />
    );
  };

  const fetchApi = async () => {
    const response = await fetch(baseURL);
    const plantsResponse = await response.json()
    
    try {
      const fetchedPlants = plantsResponse.map((plantItem) => (
        {
          ...plantItem,
          mainAttribute: 'Werks',
          checked: false,
          key:Math.random().toString()
        }
      ))

      setFilteredPlants(fetchedPlants);
      setPlants(fetchedPlants);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
    const timer = setTimeout(() => {
    }, 100)

    return () => {
      clearTimeout(timer)
    }    
  }, []);

  return (
    <View flex={1}>
      <SearchBarForCheckboxes value={plantSearchValue} onSearch={plantSearchHandler} />
      <SelectAllCheckbox onChecked={handleSelectAll} isChecked={checkedAll}/>
        <FlatList
          data={filteredPlants}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => "key" + index}
          renderItem={ListViewType} />
    </View>
  );
}

export default PlantsPage