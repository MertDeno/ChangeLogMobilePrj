import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import SnackbarComponent from '../components/SnackbarComponent';

function FilteredMaterialsList(props) {
    const height = Dimensions.get('window').height

    return (
        <View style={{flex:1, height:"100%", flexDirection: "column", justifyContent: "space-between"}}>
            <SnackbarComponent>
                <Text style={{color:"white"}}>{'Successfully filtered.'}</Text>
            </SnackbarComponent>   
        </View>             
    );
}

export default FilteredMaterialsList;