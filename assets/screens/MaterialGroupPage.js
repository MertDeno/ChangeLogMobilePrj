import React, { useEffect, useState } from 'react';
import { memo } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import SearchBarForCheckboxes from '../components/SearchBarForCheckboxes';
import SelectAllCheckbox from '../components/SelectAllCheckbox';
import style from '../css/flatlistItem.component.style.js';
import useChecked from '../hooks/use-checked';
import useSearch from '../hooks/use-search';
import useSelectAll from '../hooks/use-select-all';
import { changeLogActions } from '../redux/change-log-reducers';

function MaterialGroupPage(props) {
    const [
        [materialGroups,setMaterialGroups], 
        [filteredMaterialGroups, setFilteredMaterialGroups],
    ] = [useState([]), useState([])]

    const isCheckedAll = useSelector(state => state.changeLog.isAllSelected)
    const elementsFetched = useSelector(state => state.changeLog.elementsFetched)

    const { handleSelectAll: handleSelectAll } = useSelectAll(materialGroups, filteredMaterialGroups, setFilteredMaterialGroups)
    const { handleOnChange: handleOnChange } = useChecked(materialGroups, setMaterialGroups, filteredMaterialGroups, setFilteredMaterialGroups) 
    const { searchValue: materialGroupSearchValue, searchHandler: materialGroupSearchHandler } = useSearch(materialGroups, setFilteredMaterialGroups)
    const dispatch = useDispatch()

    var baseURL = Platform.OS === "android" ? ("http://10.0.2.2:8000/EtMatklSet") : ("https://be96-24-133-107-93.eu.ngrok.io/EtMatklSet")

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
            
             dispatch(changeLogActions.setFetchedElements(fetchedMaterialGroupData))
            dispatch(changeLogActions.setCheckedAllAfterRendering(fetchedMaterialGroupData))
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
            <SelectAllCheckbox onChecked={handleSelectAll} isChecked={isCheckedAll}/> 
            <FlatList 
                data={filteredMaterialGroups}
                keyExtractor={(item,index) => 'key'+index}
                showsHorizontalScrollIndicator={false}
                renderItem={ListViewType}
            />
        </View>
    );
}

export default memo(MaterialGroupPage);