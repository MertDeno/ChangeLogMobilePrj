
import React, { useState } from 'react'
import { View } from 'react-native';
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
            setSelectedStartDate(date)
            setSelectedEndDate(null)
        }
    }

    return (
        <View flex={1}>
            <CalendarPicker
                allowRangeSelection={true}
                scrollable
                maxDate={Date.now()}
                todayBackgroundColor="rgb(53,74,95)" 
                todayTextStyle={{color:"white"}}
                onDateChange={onDateChange}/>
        </View>
  )
}

export default CreatedAtPage;