import React, { useEffect, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { CheckBox} from 'react-native-elements';
import SearchBarForCheckboxes from '../components/SearchBarForCheckboxes';
import SelectAllCheckbox from '../components/SelectAllCheckbox';
import style from '../css/flatlistItem.component.style.js';
import useChecked from '../hooks/use-checked';
import useSearch from '../hooks/use-search';
import useSelectAll from '../hooks/use-select-all';
import { useDispatch, useSelector } from "react-redux"
import { changeLogActions } from '../redux/change-log-reducers';

function MaterialType(props) {
    const [
        [materialTypes, setMaterialTypes], 
        [filteredMaterialTypes, setFilteredMaterialTypes]
    ] = [useState([]), useState([])]
    let timer;

    const isCheckedAll = useSelector(state => state.changeLog.isAllSelected)
    const { handleSelectAll: handleSelectAll } = useSelectAll(materialTypes, filteredMaterialTypes, setFilteredMaterialTypes)
    const { searchValue: materialSearchValue, searchHandler: materialSearchHandler } = useSearch(materialTypes, setFilteredMaterialTypes)
    const { handleOnChange: handleOnChange } = useChecked(materialTypes, setMaterialTypes, filteredMaterialTypes, setFilteredMaterialTypes)
    const dispatch = useDispatch()

    let baseURL = Platform.OS === "android" ? ("http://10.0.2.2:8000/EtMtartSet") : ("https://f755-24-133-107-93.eu.ngrok.io/EtMtartSet")
    
    const ListViewType = ({item, index}) => {
        return (
          // Flat List Item
            <CheckBox 
                key={item.key}
                containerStyle={style.flatListItem} 
                onPress={() => {handleOnChange(item.Mtart)}} 
                title={item.Mtart+" - "+item.Mtbez}
                checked={item.checked}/>
        );
    };

    const fetchApi = async() => {
        const response = await fetch(baseURL)
        const materialTypeResponse = await response.json()
        
        try{
            const fetchedMaterialType = materialTypeResponse.map(materialType => (
                {
                    ...materialType,
                    mainAttribute: 'Mtart',
                    checked: false, 
                    key:Math.random().toString()
                }
            ))
            
            dispatch(changeLogActions.setFetchedElements(fetchedMaterialType))
            dispatch(changeLogActions.setCheckedAllAfterRendering(fetchedMaterialType))
            setMaterialTypes(fetchedMaterialType)
            setFilteredMaterialTypes(fetchedMaterialType)
        }
        catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchApi()
        timer = setTimeout(() => {
        }, 100)

        return () => {
            clearTimeout(timer)
        }
    },[timer])

    return (        
        <View flex={1}>
            <SearchBarForCheckboxes value={materialSearchValue} onSearch={materialSearchHandler}/>
            <SelectAllCheckbox onChecked={handleSelectAll} isChecked={isCheckedAll}/>            
                <FlatList 
                    data={filteredMaterialTypes}
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceHorizontal={false}
                    renderItem={ListViewType}
                    keyExtractor={(item, index) => 'key'+index}>
                </FlatList>
        </View>
    );
}

export default MaterialType;