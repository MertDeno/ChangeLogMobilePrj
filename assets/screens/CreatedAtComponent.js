import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';

function CreatedAtComponent(){
    const [date, setDate] = useState(new Date(Date.now()))
    const [isPickerShow, setIsPickerShow] = useState(false) 

    const onChange = (e, value) => {
        setDate(value)
    }

    return (
        <View style={styles.dateTimePickerView}>
            <DateTimePicker 
                style={styles.dateTimePicker}
                value={date}
                mode={'date'}
                is24Hour
                onChange={onChange}/>            
        </View>
  )
}

export default CreatedAtComponent;

const styles = StyleSheet.create({
    dateTimePickerView:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 50,
    },
    dateTimePicker:{
        width: 120,
        height: 560,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    } 
})