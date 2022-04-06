
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, View } from 'react-native';
import { CheckBox, SearchBar } from 'react-native-elements';
import MaterialTypeSearchBar from '../../components/MaterialTypeSearchBar.js';
import SelectAllCheckbox from '../../components/SelectAllCheckbox.js';
import style from '../css/flatlistItem.component.style.js';


function MaterialType(props) {
    const [
        [matTypeData, setMatTypeData], 
        [filteredData, setFilteredData], 
        [checkedMatType,setCheckedMatType], 
        [checkedAll,setCheckedAll], 
        [isLoading,setIsLoading], 
        [search, setSearch]
    ] = [useState([]), useState([]), useState([]), useState(), useState(false), useState('')]

    var baseURL = Platform.OS === "android" ? ("http://10.0.2.2:8000/EtMtartSet") : ("https://e34e-24-133-107-93.eu.ngrok.io/EtMtartSet"),
    trueArr = []

    const handleOnChange = (matType) => {
        if(filteredData.length === matTypeData.length){
            matTypeData.forEach((item) => {
                if(matType === item.Mtart){
                    item.checked = !item.checked
                    setCheckedAll(false)
                    return item.checked
                }
                else{
                    item.checked = item.checked
                    return item.checked
                }
            })
        
            setCheckedMatType(matTypeData.filter((item) => item.checked))        
            setFilteredData(matTypeData)
    
            matTypeData.forEach((item) => {
                if(item.checked){
                    trueArr.push(item.Mtart)
                }
            })            
        }
        else{
            filteredData.forEach((item) => {
                if(matType === item.Mtart){
                    item.checked = !item.checked
                    setCheckedAll(false)
                    return item.checked
                }
                else{
                    item.checked = item.checked
                    return item.checked
                }
            })
            setCheckedMatType(matTypeData.filter((item) => item.checked))               
            setFilteredData(filteredData)
    
            filteredData.forEach((item) => {
                if(item.checked){
                    trueArr.push(item.Mtart)
                }
            })                                    
        }

        trueArr.length === matTypeData.length || trueArr.length === filteredData.length ? setCheckedAll(true) : false
    }

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
        try{
            const matTypeRes = await axios.get(baseURL)
            setMatTypeData(matTypeRes.data.map(data => ({...data, checked: false, key:Math.random().toString()})))
            setFilteredData(matTypeRes.data.map(data => ({...data, checked: false, key:Math.random().toString()})))
        }
        catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchApi()
    },[])

    
    const updateSearch = (search) => {
        setSearch(search)

        const newData = matTypeData.filter((item) => {
            return item.Mtart.includes(search.toUpperCase())
        })

        for (let index = 0; index < newData.length; index++) {
            const item = newData[index];
            if(!item.checked){
                setCheckedAll(false)
                break
            }
            else{
                setCheckedAll(true)
            }
        }
    
        setFilteredData(newData) 
    }

    const handleSelectAll = () => {
        setCheckedAll(!checkedAll)
        if(!checkedAll){
            if(filteredData.length === matTypeData.length){
                matTypeData.forEach((item,index) => {
                    item.checked = !item.checked
                    if(item.checked)
                        trueArr.push(item.Mtart)
                })
        
                matTypeData.forEach((item,index) => {
                    if(!item.checked)
                        item.checked = true
//                        trueArr.push(item.Mtart)
                })
    
                setCheckedMatType(matTypeData.filter((item) => item.checked))
                setFilteredData(matTypeData)
            }
            else{
                filteredData.forEach((item) => {
                    item.checked = !item.checked
                    if(item.checked)
                        trueArr.push(item.Mtart)
                })

                filteredData.forEach((item,index) => {
                    if(!item.checked)
                        item.checked = true
//                        trueArr.push(item.Mtart)
                })                
            //    setCheckedAll(false)
                setCheckedMatType(filteredData.filter((item) => item.checked))
                setFilteredData(filteredData)                
            }
        }
        else{
            filteredData.forEach((item,index) => {
                item.checked = false
            })            
            setCheckedAll(false)
        }
    }

    return (        
        <View flex={1}>
            <MaterialTypeSearchBar matTypeValue={search} onMatTypeSearch={updateSearch}/>
            <SelectAllCheckbox onChecked={handleSelectAll} isChecked={checkedAll}/>
                {isLoading ? (
                    <View style={{flex:3,justifyContent:"center", alignItems:"center"}}>
                        <ActivityIndicator size={"large"}/>
                    </View>
                ):(             
                <FlatList 
                    data={filteredData}
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceHorizontal={false}
                    renderItem={ListViewType}>
                </FlatList>
            )}
        </View>
    );
}

export default MaterialType;