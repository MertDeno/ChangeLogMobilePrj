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
        [filteredMaterialTypes, setFilteredMaterialTypes], 
        [checkedAll, setCheckedAll]
    ] = [useState([]), useState([]), useState(false)]

    const { handleSelectAll: handleSelectAll } = useSelectAll(checkedAll, setCheckedAll, materialTypes, filteredMaterialTypes, setFilteredMaterialTypes)
    const { searchValue: materialSearchValue, searchHandler: materialSearchHandler } = useSearch(setCheckedAll, materialTypes, setFilteredMaterialTypes)
    const { handleOnChange: handleOnChange } = useChecked(setCheckedAll, materialTypes, setMaterialTypes, filteredMaterialTypes, setFilteredMaterialTypes)
    const fetchedElements = useSelector(state => state.changeLog.fetchedElements)
    const dispatch = useDispatch()

    let baseURL = Platform.OS === "android" ? ("http://10.0.2.2:8000/EtMtartSet") : ("https://7333-212-252-137-37.eu.ngrok.io/EtMtartSet")
    
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
            
            setMaterialTypes(fetchedMaterialType)
            setFilteredMaterialTypes(fetchedMaterialType)
            fetchedElements.length === 0 && dispatch(changeLogActions.setFetchedElements(fetchedMaterialType))
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
    },[])

    return (        
        <View flex={1}>
            <SearchBarForCheckboxes value={materialSearchValue} onSearch={materialSearchHandler}/>
            <SelectAllCheckbox onChecked={handleSelectAll} isChecked={checkedAll}/>            
                <FlatList 
                    data={fetchedElements.length > 0 ? fetchedElements : filteredMaterialTypes}
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceHorizontal={false}
                    renderItem={ListViewType}
                    keyExtractor={(item, index) => 'key'+index}>
                </FlatList>
        </View>
    );
}

export default MaterialType;