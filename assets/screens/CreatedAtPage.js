
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker/CalendarPicker';


function CreatedAtPage(){
    const [
        [selectedStartDate, setSelectedStartDate], 
        [selectedEndDate, setSelectedEndDate] ] = [useState(null) ,useState(null)]

    const onDateChange = (date,type) => {
        if(type === 'END_DATE'){
            setSelectedEndDate(date)
        }
        else{
            setSelectedEndDate(null)
            setSelectedStartDate(date)
        }
    }

    return (
        <View flex={1}>
            <CalendarPicker 
                allowRangeSelection={true}
                scrollable
                maxDate={Date.now()}
                onDateChange={onDateChange}/>
        </View>
  )
}

export default CreatedAtPage;