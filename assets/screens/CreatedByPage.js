
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, View } from 'react-native';
import { CheckBox, SearchBar } from 'react-native-elements';
import style from '../css/flatlistItem.component.style.js';

function CreatedByPage(props) {
    const [
        [createdByData, setCreatedByData], 
        [filteredData, setFilteredData],
        [checkedPersonType,setCheckedPerson],
        [checkedAll,setCheckedAll],    
        [isLoading,setIsLoading],
        [search, setSearch]
    ] = [useState([]), useState([]), useState([]), useState(), useState(false), useState('')]

    var baseURL = Platform.OS === "android" ? ("http://10.0.2.2:8000/EtFilterPersonalsSet") : ("https://e34e-24-133-107-93.eu.ngrok.io/EtFilterPersonalsSet"),
    trueArr = []

    const handleOnChange = (userName) => {
        if(filteredData.length === createdByData.length){
            createdByData.forEach((item) => {
                if(userName === item.Uname){
                    item.checked = !item.checked
                    setCheckedAll(false)
                    return item.checked
                }
                else{
                    item.checked = item.checked
                    return item.checked
                }
            })
        
            setCheckedPerson(createdByData.filter((item) => item.checked === true))        
            setFilteredData(createdByData)
    
            createdByData.forEach((item) => {
                if(item.checked === true){
                    trueArr.push(item.Uname)
                }
            })            
        }
        else{
            filteredData.forEach((item) => {
                if(userName === item.Uname){
                    item.checked = !item.checked
                    setCheckedAll(false)
                    return item.checked
                }
                else{
                    item.checked = item.checked
                    return item.checked
                }
            })
            setCheckedPerson(filteredData.filter((item) => item.checked === true))        
            setFilteredData(filteredData)
    
            filteredData.forEach((item) => {
                if(item.checked === true){
                    trueArr.push(item.Uname)
                }
            })                                    
        }

        if(trueArr.length === createdByData.length || trueArr.length === filteredData.length){
            setCheckedAll(true)
        }
    }

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
            const personResult = await axios.get(baseURL)
            setCreatedByData(personResult.data.map(data => ({...data, checked: false})))
            setFilteredData(personResult.data.map(data => ({...data, checked: false})))
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

        const newData = createdByData.filter((item) => {
            return item.Uname.includes(search.toUpperCase())
        })

        for (let index = 0; index < newData.length; index++) {
            const item = newData[index];
            if(item.checked === false){
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
            if(filteredData.length === createdByData.length){
                createdByData.forEach((item,index) => {
                    item.checked = !item.checked
                    if(item.checked === true)
                        trueArr.push(item.Uname)
                })
        
                createdByData.forEach((item,index) => {
                    if(item.checked === false)
                        item.checked = true
//                        trueArr.push(item.Uname)
                })
    
                setCheckedPerson(createdByData.filter((item) => item.checked))
                setFilteredData(createdByData)
            }
            else{
                filteredData.forEach((item) => {
                    item.checked = !item.checked
                    if(item.checked === true)
                        trueArr.push(item.Uname)
                })

                filteredData.forEach((item,index) => {
                    if(item.checked === false)
                        item.checked = true
//                        trueArr.push(item.Uname)
                })                
            //    setCheckedAll(false)
                setCheckedPerson(filteredData.filter((item) => item.checked))
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
        <SearchBar value={search} 
            inputStyle={{backgroundColor:"#fff", borderRadius:15}} 
            containerStyle={{backgroundColor:"rgb(247,247,247)"}} 
            onChangeText={updateSearch} 
            placeholder="Search.."
            lightTheme
            round
            inputContainerStyle={{backgroundColor:"rgb(247,247,247)"}}/>
            <CheckBox containerStyle={style.flatListItem} title="Select All" onPress={handleSelectAll} checked={checkedAll}></CheckBox>
            {isLoading ? (
                <View style={{flex:3,justifyContent:"center", alignItems:"center"}}>
                    <ActivityIndicator size={"large"}/>
                </View>
            ):(             
            <FlatList 
                data={filteredData}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={ListViewType}>
            </FlatList>
        )}
    </View>
    );
}

export default CreatedByPage;