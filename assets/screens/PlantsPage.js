import React, { useEffect, useState } from "react";
import { View, Platform, FlatList } from "react-native";
import { CheckBox } from "react-native-elements";
import { useDispatch, useSelector } from 'react-redux';
import SearchBarForCheckboxes from "../components/SearchBarForCheckboxes";
import SelectAllCheckbox from "../components/SelectAllCheckbox";
import useChecked from "../hooks/use-checked";
import useSearch from "../hooks/use-search";
import useSelectAll from "../hooks/use-select-all"; 
import style from '../css/flatlistItem.component.style.js';
import { changeLogActions } from '../redux/change-log-reducers';

function PlantsPage() {
  const[
    [filteredPlants, setFilteredPlants],
    [plants, setPlants]
  ] = [useState([]), useState([])]

  const isCheckedAll = useSelector(state => state.changeLog.isAllSelected)
  const { handleOnChange: handleOnChange } = useChecked(plants, setPlants, filteredPlants, setFilteredPlants)
  const { handleSelectAll: handleSelectAll } = useSelectAll(plants, filteredPlants, setFilteredPlants)
  const { searchHandler: plantSearchHandler, searchValue: plantSearchValue } = useSearch(plants, setFilteredPlants)
  const dispatch = useDispatch()

  var baseURL = Platform.OS === "android" ? "http://10.0.2.2:8000/EtWerksSet" : "https://be96-24-133-107-93.eu.ngrok.io/EtWerksSet";

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
      
      dispatch(changeLogActions.setFetchedElements(fetchedPlants))
      dispatch(changeLogActions.setCheckedAllAfterRendering(fetchedPlants))
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
      <SelectAllCheckbox onChecked={handleSelectAll} isChecked={isCheckedAll}/>
        <FlatList
          data={filteredPlants}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => "key" + index}
          renderItem={ListViewType} />
    </View>
  );
}

export default PlantsPage