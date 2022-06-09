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

function SalesOrganizationPage(props) {
  const [filteredSalesOrganizations, setFilteredSalesOrganizations] = useState([]);
  const [salesOrganizations, setSalesOrganizations] = useState([]);
  const [isCheckedAll, setIsCheckedAll] = useState();

  const { handleOnChange: handleOnChange } = useChecked(setIsCheckedAll, salesOrganizations, setSalesOrganizations, filteredSalesOrganizations, setFilteredSalesOrganizations)
  const { searchHandler: searchSalesOrganizationHandler, searchValue: salesOrganizationValue } = useSearch(setIsCheckedAll, salesOrganizations, setFilteredSalesOrganizations)
  const { handleSelectAll: handleSelectAll } = useSelectAll(isCheckedAll, setIsCheckedAll, salesOrganizations, setSalesOrganizations, filteredSalesOrganizations, setFilteredSalesOrganizations)
  const dispatch = useDispatch()

  var baseURL = Platform.OS === "android" ? "http://10.0.2.2:8000/EtVkorgSet" : "https://8567-24-133-107-93.eu.ngrok.io/EtVkorgSet"

  const ListViewType = ({ item, index }) => {
    return (
      // Flat List Item
      <CheckBox
        containerStyle={style.flatListItem}
        onPress={() => handleOnChange(item.Vkorg)}
        title={item.Vkorg + " - " + item.Vtext}
        checked={item.checked}
      />
    );
  };

  const fetchApi = async () => {
    const response = await fetch(baseURL)
    const salesOrganizationResponse = await response.json()
    
    try {
      const fetchedSalesOrganizations = salesOrganizationResponse.map(salesOrganization => (
          {
            ...salesOrganization,
            mainAttribute: 'Vkorg',
            checked: false,
            key:Math.random().toString()
          }
        )
      )

      setSalesOrganizations(fetchedSalesOrganizations)
      setFilteredSalesOrganizations(fetchedSalesOrganizations)
      dispatch(changeLogActions.setFetchedElements(fetchedSalesOrganizations))

    } catch (error) {
      console.log(error)
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
      <SearchBarForCheckboxes value={salesOrganizationValue} onSearch={searchSalesOrganizationHandler} />
      <SelectAllCheckbox onChecked={handleSelectAll} isChecked={isCheckedAll} />
        <FlatList
          data={filteredSalesOrganizations}
          showsHorizontalScrollIndicator={false}
          alwaysBounceHorizontal={false}
          keyExtractor={(item, index) => "key" + index}
          renderItem={ListViewType} />
    </View>
  );
}

export default SalesOrganizationPage;