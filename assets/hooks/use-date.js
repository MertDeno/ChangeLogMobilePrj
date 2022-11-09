import { useDispatch, useSelector } from 'react-redux';
import { changeLogActions } from '../redux/change-log-reducers';

function useDate(dateParameter) {
    const dispatch = useDispatch()
    const startCreatedDateValue = useSelector(state => state.changeLog.createdDateStart)
    const startChangedDateValue = useSelector(state => state.changeLog.changedDateStart)

    const onDateChange = (date,type) => {
        debugger
        if(type === 'END_DATE'){
            if(date != null){
                if(dateParameter === 'Ersda'){
                    dispatch(changeLogActions.setCreatedEndDate(date.toISOString()))  
                    dispatch(changeLogActions.addOrUpdateDate({
                        id: Math.random().toString(),
                        sPath: 'Ersda',
                        oValue1: startCreatedDateValue,
                        oValue2: date.toISOString(),
                        operator: 'bt',
                        mainAttribute: dateParameter
                    }))
                }
                else{
                    dispatch(changeLogActions.setChangedEndDate(date.toISOString()))
                    dispatch(changeLogActions.addOrUpdateDate({
                        id: Math.random().toString(),
                        sPath: 'Laeda',
                        oValue1: startChangedDateValue,
                        oValue2: date.toISOString(),
                        operator: 'bt',
                        mainAttribute: dateParameter
                    }))
                }
            }
            else{
                if(dateParameter === 'Ersda')
                    dispatch(changeLogActions.setCreatedEndDate(''))                  
                else
                    dispatch(changeLogActions.setChangedEndDate(''))                  
            }
        
        }
        else if(type === 'START_DATE'){
            if(dateParameter === 'Ersda')
                dispatch(changeLogActions.setCreatedStartDate(date.toISOString()))
            else
                dispatch(changeLogActions.setChangedStartDate(date.toISOString()))
        }  
    }

    return {
        onDateChange
    }    
}

export default useDate;