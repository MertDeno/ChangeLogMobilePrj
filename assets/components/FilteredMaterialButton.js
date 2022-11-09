import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

function FilteredMaterialButton(props) {
    return (
        <View style={{borderRadius: 20, borderColor:"red", borderWidth:1, margin:3}} onPress={() => alert(11111)}>
            <Text>{props.children}</Text>
        </View>
    );
}

export default FilteredMaterialButton;