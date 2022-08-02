import { useDispatch, useSelector } from "react-redux"
import { changeLogActions } from "../redux/change-log-reducers"

const useSelectAll = (list, filteredList, setFilteredList) => {
    const dispatch = useDispatch()
    const checkedAll = useSelector(state => state.changeLog.isAllSelected)
    
    function handleSelectAll(){
        dispatch(changeLogActions.setCheckedAll(!checkedAll))

        debugger
        if(!checkedAll){
            if(filteredList.length === list.length){
                list.forEach((item) => {
                    item.checked = !item.checked
                })
        
                list.forEach((item) => {
                    if(!item.checked)
                        item.checked = true
                })

                list.forEach((item) => {
                    debugger
                    dispatch(changeLogActions.addCheckedElements({
                        id: item[item.mainAttribute],
                        sPath: item.mainAttribute,
                        oValue1: item[item.mainAttribute],
                        operator: 'EQ',
                        checked: item.checked
                    }))  
                })  

            }
            else{
                filteredList.forEach((item) => {
                    item.checked = !item.checked
                })
    
                filteredList.forEach((item) => {
                    if(!item.checked)
                        item.checked = true
                })                

                filteredList.forEach((item) => {
                    dispatch(changeLogActions.addCheckedElements({
                        id: item[item.mainAttribute],
                        sPath: item.mainAttribute,
                        oValue1: item[item.mainAttribute],
                        operator: 'EQ',
                        checked: item.checked
                    }))  
                })            
            }              
        }
        else{
            filteredList.forEach((item) => {
                item.checked = !item.checked
            })

            filteredList.forEach((item) => {
                dispatch(changeLogActions.addCheckedElements({
                    id: item[item.mainAttribute],
                    sPath: item.mainAttribute,
                    oValue1: item[item.mainAttribute],
                    operator: 'EQ',
                    checked: item.checked
                }))  
            })               
        }

        setFilteredList(filteredList)
    }

    return {
        handleSelectAll
    }
}

export default useSelectAll