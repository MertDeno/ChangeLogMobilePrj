import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header } from 'react-native-elements';
import  Icon  from 'react-native-vector-icons/Feather';
import style from '../css/firstPage.component.style';
import FilterPage from './FilterPage';


function FirstPage({ navigation }) {
    const filterPage = () => navigation.navigate("FilterPage")
    return (
        <View flex={1}>
            <Header backgroundColor="rgb(53,74,95)" 
                    centerComponent={{text:"Main Page", style: { color: '#fff', marginTop:5 }}}
                    rightComponent={
                        <TouchableOpacity>
                            <Icon name='menu' color={"#fff"} size={25}></Icon>
                        </TouchableOpacity>}>
            </Header>
            <View style={style.container}>
                <Icon name="filter" size={50}/>
                <Text style={{marginTop:10}}>Please use the filter tool to see materials</Text>
                <TouchableOpacity style={style.filterBtn} onPress={filterPage}>
                    <Text style={{color:"rgba(8,84,160,255)"}}>Filter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default FirstPage;