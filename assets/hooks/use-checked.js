import { useDispatch } from "react-redux"
import { changeLogActions } from "../redux/change-log-reducers"

function useChecked(setCheckedAll, list, setList, filteredList, setFilteredList){
    let checkedElements = []
    const dispatch = useDispatch()

    const manipulateListItem = (item) => {
        debugger
        item.checked = !item.checked
        
        dispatch(changeLogActions.addCheckedElements({
            id: item[item.mainAttribute],
            sPath: item.mainAttribute,
            oValue1: item[item.mainAttribute],
            operator: 'EQ',
            checked: item.checked
        }))           
    }
 
    function setAllLists(list, filteredList){
        debugger
        setList(list.filter((item) => item))               
        setFilteredList(filteredList)     
    }

    function handleOnChange(itemToBeChecked){
        debugger
        filteredList.forEach((item) => {
            if(itemToBeChecked === item[list[0].mainAttribute]){
                debugger
                manipulateListItem(item)
                dispatch(changeLogActions.setCheckedAllAfterRendering(filteredList))
            }
            else{
                return item.checked
            }
        })
        
//        dispatch(changeLogActions.setCheckedAll(filteredList.every(changeLogActions.setCheckedAllAfterRendering)))
        setAllLists(list, filteredList)
    }
 
    return {
        handleOnChange
    }
}

export default useChecked