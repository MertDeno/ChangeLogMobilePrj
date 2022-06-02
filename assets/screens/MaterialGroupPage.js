import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import SearchBarForCheckboxes from '../components/SearchBarForCheckboxes';
import SelectAllCheckbox from '../components/SelectAllCheckbox';
import style from '../css/flatlistItem.component.style.js';
import useChange from '../hooks/use-change';
import useSearch from '../hooks/use-search';
import useSelectAll from '../hooks/use-select-all';

function MaterialGroupPage(props) {
    const [
        [materialGroups,setMaterialGroups], 
        [filteredMaterialGroups, setFilteredMaterialGroups], 
        [checkedAll, setCheckedAll],
    ] = [useState([]), useState([]), useState(false)]

    const { handleSelectAll: handleSelectAll } = useSelectAll(checkedAll, setCheckedAll, materialGroups, setMaterialGroups, filteredMaterialGroups, setFilteredMaterialGroups)
    const { handleOnChange: handleOnChange } = useChange(setCheckedAll, materialGroups, setMaterialGroups, filteredMaterialGroups, setFilteredMaterialGroups) 
    const { searchValue: materialGroupSearchValue, searchHandler: materialGroupSearchHandler } = useSearch(setCheckedAll, materialGroups, setFilteredMaterialGroups)

    var baseURL = Platform.OS === "android" ? ("http://10.0.2.2:8000/EtMatklSet") : ("https://8567-24-133-107-93.eu.ngrok.io/EtMatklSet")

    const fetchApi = async() => {
        const response = await fetch(baseURL)
        const materialGroupResponse = await response.json()

        try{
            const fetchedMaterialGroupData = materialGroupResponse.map(materialGroupItem => (
                {
                    ...materialGroupItem,
                    mainAttribute: 'Matkl',
                    checked: false, 
                    key:Math.random().toString()
                }
            ))
            setMaterialGroups(fetchedMaterialGroupData)
            setFilteredMaterialGroups(fetchedMaterialGroupData)
        }
        catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchApi()
        const timer = setTimeout(() => {
        }, 100)

        return () => {
            clearTimeout(timer)
        }        
    }, [])

    const ListViewType = ({item, index}) => {
        return (
          // Flat List Item
            <CheckBox 
                containerStyle={style.flatListItem} 
                onPress={() => {handleOnChange(item.Matkl)}} 
                title={item.Matkl+" - "+item.Wgbez}
                checked={item.checked}/>
        );
    };

    return (
        <View flex={1}>
            <SearchBarForCheckboxes value={materialGroupSearchValue} onSearch={materialGroupSearchHandler}/>
            <SelectAllCheckbox onChecked={handleSelectAll} isChecked={checkedAll}/> 
            <FlatList 
                data={filteredMaterialGroups}
                keyExtractor={(item,index) => 'key'+index}
                showsHorizontalScrollIndicator={false}
                renderItem={ListViewType}
            />
        </View>
    );
}

export default MaterialGroupPage;