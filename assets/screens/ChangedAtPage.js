import React from 'react'
import { View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker/CalendarPicker';
import { useSelector } from 'react-redux';
import useDate from '../hooks/use-date';

function ChangedAtPage(props) {
    const startDateValue = useSelector(state => state.changeLog.changedDateStart)
    const endDateValue = useSelector(state => state.changeLog.changedDateEnd)
    const { onDateChange: handleOnChange } = useDate()                       

    return (
        <View flex={1}>
            <CalendarPicker
                allowRangeSelection={true}
                selectedStartDate={startDateValue}
                selectedEndDate={endDateValue}
                scrollable
                maxDate={Date.now()}
                todayBackgroundColor="rgb(53,74,95)" 
                todayTextStyle={{color:"white"}}
                onDateChange={handleOnChange}/>
        </View>
  )
}

export default ChangedAtPage;