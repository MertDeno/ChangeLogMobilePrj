
import React from 'react'
import { View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker/CalendarPicker';
import { useDispatch, useSelector } from 'react-redux';
import useDate from '../hooks/use-date';

function CreatedAtPage(){
    const dateParameter = 'Ersda'
    const startDateValue = useSelector(state => state.changeLog.createdDateStart)
    const endDateValue = useSelector(state => state.changeLog.createdDateEnd)
    const { onDateChange: handleOnChange } = useDate(dateParameter)                       

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

export default CreatedAtPage;


/*             let startDate = ''
            startDate = moment(date).format('YYYY-MM-DD').replace(/-/g,'') */
/*             let endDate = ''
            endDate = moment(date).format('YYYY-MM-DD').replace(/-/g, '') */