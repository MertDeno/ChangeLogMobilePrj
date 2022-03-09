
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, View } from 'react-native';
import { CheckBox, SearchBar } from 'react-native-elements';


function MaterialType(props) {
    const [matTypeData, setMatTypeData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [checkedMatType,setCheckedMatType] = useState()
    const [isLoading,setIsLoading] = useState(false)
    const [search, setSearch] = useState('')
    var baseURL = Platform.OS === "android" ? ("http://10.0.2.2:8000/EtMtartSet") : ("https://f57e-24-133-107-93.eu.ngrok.io/EtMtartSet")

    const handleOnChange = (matType) => {
        matTypeData.forEach((item) => {
            if(matType === item.Mtart){
                item.checked = !item.checked
                return item.checked
            }
            else{
                item.checked = item.checked
                return item.checked
            }
        })

        setCheckedMatType(matTypeData.filter((item) => item.checked))
        setFilteredData(matTypeData)
    }

    const ListViewType = ({item, index}) => {
        return (
          // Flat List Item
            <CheckBox 
                containerStyle={styles.flatListItem} 
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
            return item.Mtart.includes(search.toUpperCase()) || item.Mtbez.includes(search.toUpperCase()) 
        })
        setFilteredData(newData)
    }

    const handleSelectAll = () => {
        matTypeData.map(item => {
            item.checked = !item.checked
        })

        setCheckedMatType(matTypeData.filter((item) => item.checked))
        setFilteredData(matTypeData)
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
                <CheckBox containerStyle={styles.flatListItem} title="Select All" onPress={handleSelectAll} checked={checkedMatType}></CheckBox>
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

const styles = StyleSheet.create({
    flatListItem:{
        backgroundColor:"#fff",
        borderRadius:20,
        padding:20,
        margin:5
    }
})