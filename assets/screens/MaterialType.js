
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, View } from 'react-native';
import { CheckBox, SearchBar } from 'react-native-elements';
import style from '../css/flatlistItem.component.style.js';


function MaterialType(props) {
    const [matTypeData, setMatTypeData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [checkedMatType,setCheckedMatType] = useState([])
    const [checkedAll,setCheckedAll] = useState()    
    const [isLoading,setIsLoading] = useState(false)
    const [search, setSearch] = useState('')

    var baseURL = Platform.OS === "android" ? ("http://10.0.2.2:8000/EtMtartSet") : ("https://92ae-24-133-107-93.eu.ngrok.io/EtMtartSet")
    var trueArr = []

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
        
            setCheckedMatType(matTypeData.filter((item) => item.checked === true))        
            setFilteredData(matTypeData)
    
            matTypeData.forEach((item) => {
                if(item.checked === true){
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
            setCheckedMatType(filteredData.filter((item) => item.checked === true))        
            setFilteredData(filteredData)
    
            filteredData.forEach((item) => {
                if(item.checked === true){
                    trueArr.push(item.Mtart)
                }
            })                                    
        }

        if(trueArr.length === matTypeData.length || trueArr.length === filteredData.length){
            setCheckedAll(true)
        }
    }

    const ListViewType = ({item, index}) => {
        return (
          // Flat List Item
            <CheckBox 
                containerStyle={style.flatListItem} 
                onPress={() => {handleOnChange(item.Mtart)}} 
                title={item.Mtart+" - "+item.Mtbez}
                checked={item.checked}/>
        );
    };

    const fetchApi = async() => {
        try{
            const matTypeRes = await axios.get(baseURL)
            setMatTypeData(matTypeRes.data.map(data => ({...data, checked: false})))
//            setMatTypeData(matTypeRes.data)
            setFilteredData(matTypeRes.data.map(data => ({...data, checked: false})))
            /*setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)*/
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
        if(checkedAll !== true){
            if(filteredData.length === matTypeData.length){
                matTypeData.forEach((item,index) => {
                    item.checked = !item.checked
                    if(item.checked === true)
                        trueArr.push(item.Mtart)
                })
        
                matTypeData.forEach((item,index) => {
                    if(item.checked === false)
                        item.checked = true
//                        trueArr.push(item.Mtart)
                })
    
                setCheckedMatType(matTypeData.filter((item) => item.checked))
                setFilteredData(matTypeData)
            }
            else{
                filteredData.forEach((item) => {
                    item.checked = !item.checked
                    if(item.checked === true)
                        trueArr.push(item.Mtart)
                })

                filteredData.forEach((item,index) => {
                    if(item.checked === false)
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

export default MaterialType;