import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { CheckBox, SearchBar } from 'react-native-elements';
import style from '../css/flatlistItem.component.style.js';

function MaterialGroupPage(props) {
    const [matGrpData,setMatGrpData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [checkedMatGrp, setCheckedMatGrp] = useState([])    
    const [checkedAll, setCheckedAll ] = useState(false)
    const [search, setSearch] = useState()
    
    var baseURL = Platform.OS === "android" ? ("http://10.0.2.2:8000/EtMatklSet") : ("https://92ae-24-133-107-93.eu.ngrok.io/EtMatklSet")
    var trueArr = []

    const fetchApi = async() => {
        try {
            const matklDataRes = await axios(baseURL)
            setMatGrpData(matklDataRes.data.map(data => ({...data, checked: false})))
            setFilteredData(matklDataRes.data.map(data => ({...data, checked: false})))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchApi()
    }, [])

    const handleOnChange = (matkl) => {
        if(filteredData.length === matGrpData.length){
            matGrpData.forEach((item) => {
                if(matkl === item.Matkl){
                    item.checked = !item.checked
                    setCheckedAll(false)
                    return item.checked
                }
                else{
                    item.checked = item.checked
                    return item.checked
                }
            })
        
            setCheckedMatGrp(matGrpData.filter((item) => item.checked))
            setFilteredData(matGrpData)

            matGrpData.forEach((item) => {
                if(item.checked === true){
                    trueArr.push(item.Mtart)
                }
            })                  
        }
        else{
            filteredData.forEach((item) => {
                if(matkl === item.Matkl){
                    item.checked = !item.checked
                    setCheckedAll(false)
                    return item.checked
                }
                else{
                    item.checked = item.checked
                    return item.checked
                }
            })
        
            setCheckedMatGrp(filteredData.filter((item) => item.checked))
            setFilteredData(filteredData)

            filteredData.forEach((item) => {
                if(item.checked === true){
                    trueArr.push(item.Mtart)
                }
            })            
        }

        if(trueArr.length === matGrpData.length || trueArr.length === filteredData.length){
            setCheckedAll(true)
        }
    }

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

    const changeTextHandle = (search) => {
        setSearch(search)

        const searchResult = matGrpData.filter((item) => {
            return item.Matkl.includes(search)
        })

        for (let index = 0; index < searchResult.length; index++) {
            const item = searchResult[index];
            if(item.checked === false){
                setCheckedAll(false)
                break
            }
            else{
                setCheckedAll(true)
            }
        }
        
        setFilteredData(searchResult)
    }

    const handleSelectAll = () => {
        setCheckedAll(!checkedAll)
        if(checkedAll !== true){
            if(filteredData.length === matGrpData.length){
                matGrpData.forEach((item) => {
                    item.checked = !item.checked
                    if(item.checked === true)
                        trueArr.push(item.Matkl)
                })
            
                matGrpData.forEach((item) => {
                    if(item.checked === false)
                        item.checked = true
                })
            
                setCheckedMatGrp(matGrpData.filter((item) => item.checked))
                setFilteredData(matGrpData)
            }
            else{
                filteredData.forEach((item) => {
                    item.checked = !item.checked
                    if(item.checked === true)
                        trueArr.push(item.Matkl)
                })

                filteredData.forEach((item) => {
                    if(item.checked === false)
                        item.checked = true
                })

                setCheckedMatGrp(filteredData.filter((item) => item.checked))
                setFilteredData(filteredData)
            }

        }
        else{
            filteredData.forEach((item) => {
                item.checked = false
            })      
            setCheckedAll(false)      
        }
    }

    return (
        <View flex={1}>
            <SearchBar
                value={search}
                inputStyle={{backgroundColor:"#fff", borderRadius:15}}
                containerStyle={{backgroundColor:"rgb(247,247,247)"}}
                inputContainerStyle={{backgroundColor:"rgb(247,247,247)"}}
                placeholder="Search.."
                round
                lightTheme
                onChangeText={changeTextHandle}/>
                <CheckBox containerStyle={style.flatListItem} checked={checkedAll} title="Select All" onPress={handleSelectAll}/>
                <FlatList 
                    data={filteredData}
                    keyExtractor={(item,index) => 'key'+index}
                    showsHorizontalScrollIndicator={false}
                    renderItem={ListViewType}
                />
        </View>
    );
}

export default MaterialGroupPage;