import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';
import style from '../assets/css/flatlistItem.component.style';

function SelectAllCheckbox(props) {
    function handleSelectAll(){
        props.onChecked()
    }

    return (
        <CheckBox 
            containerStyle={style.flatListItem} 
            title="Select All" 
            onPress={handleSelectAll} 
            checked={props.isChecked}/>
    );
}

export default SelectAllCheckbox;