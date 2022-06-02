import React, { useEffect, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import SearchBarForCheckboxes from '../components/SearchBarForCheckboxes';
import SelectAllCheckbox from '../components/SelectAllCheckbox';
import style from '../css/flatlistItem.component.style.js';
import useChange from '../hooks/use-change';
import useSearch from '../hooks/use-search';
import useSelectAll from '../hooks/use-select-all';

function CreatedByPage() {
    const [
        [creators, setCreators], 
        [filteredCreators, setFilteredCreators],
        [checkedAll,setCheckedAll]
    ] = [useState([]), useState([]), useState(false)]

    const { handleOnChange: handleOnChange } = useChange(setCheckedAll, creators, setCreators, filteredCreators, setFilteredCreators)
    const { handleSelectAll: handleSelectAll } = useSelectAll(checkedAll, setCheckedAll, creators, setCreators, filteredCreators, setFilteredCreators)
    const { searchValue: creatorValue, searchHandler: searchCreatorHandler} = useSearch(setCheckedAll, creators, setFilteredCreators)

    var baseURL = Platform.OS === "android" ? ("http://10.0.2.2:8000/EtFilterPersonalsSet") : ("https://8567-24-133-107-93.eu.ngrok.io/EtFilterPersonalsSet")

    const ListViewType = ({item, index}) => {
        return (
          // Flat List Item
            <CheckBox 
                containerStyle={style.flatListItem} 
                onPress={() => {handleOnChange(item.Uname)}} 
                title={item.Uname+" - "+item.FullName}
                checked={item.checked}/>
        );
    };

    const fetchApi = async() => {
        try{
            const response = await fetch(baseURL)
            const personResult = await response.json()

            const fetchedSAPUsers = personResult.map(items => (
                {
                    ...items,
                    mainAttribute: 'Uname',
                    checked: false,
                    key:Math.random().toString()
                }
            ))

            setCreators(fetchedSAPUsers)
            setFilteredCreators(fetchedSAPUsers)
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
            <SearchBarForCheckboxes value={creatorValue} onSearch={searchCreatorHandler}/>
            <SelectAllCheckbox onChecked={handleSelectAll} isChecked={checkedAll}/>              
            <FlatList 
                data={filteredCreators}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={ListViewType}>
            </FlatList>
        </View>
    );
}

export default CreatedByPage;