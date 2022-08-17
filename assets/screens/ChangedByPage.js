import React, { useEffect, useState } from 'react';
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

function ChangedByPage(props) {
    const [
        [changers, setChangers], 
        [filteredChangers, setFilteredChangers]
    ] = [useState([]), useState([])]

    const isCheckedAll = useSelector(state => state.changeLog.isAllSelected)
    const { handleOnChange: handleOnChange } = useChecked(changers, setChangers, filteredChangers, setFilteredChangers)
    const { handleSelectAll: handleSelectAll } = useSelectAll(changers, filteredChangers, setFilteredChangers)
    const { searchValue: creatorValue, searchHandler: searchCreatorHandler} = useSearch(changers, setFilteredChangers)
    const dispatch = useDispatch()

    var baseURL = Platform.OS === "android" ? ("http://10.0.2.2:8000/EtFilterPersonalsSet") : ("https://f755-24-133-107-93.eu.ngrok.io/EtFilterPersonalsSet")

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

            dispatch(changeLogActions.setFetchedElements(fetchedSAPUsers))
            dispatch(changeLogActions.setCheckedAllAfterRendering(fetchedSAPUsers))
            setChangers(fetchedSAPUsers)
            setFilteredChangers(fetchedSAPUsers)
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
            <SelectAllCheckbox onChecked={handleSelectAll} isChecked={isCheckedAll}/>              
            <FlatList 
                data={filteredChangers}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={ListViewType}>
            </FlatList>
        </View>    
    );
}

export default ChangedByPage;