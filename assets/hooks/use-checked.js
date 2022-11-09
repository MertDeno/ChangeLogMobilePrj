import { useDispatch, useSelector } from "react-redux"
import { changeLogActions } from "../redux/change-log-reducers"

function useChecked(list, setList, filteredList, setFilteredList){
    const dispatch = useDispatch()

    const manipulateListItem = (item) => {
        debugger
        item.checked = !item.checked

        dispatch(changeLogActions.addCheckedElements({
            id: item.key,
            sPath: item.mainAttribute,
            oValue1: (item.mainAttribute != 'Ernam' && item.mainAttribute != 'Aenam') ? item[item.mainAttribute] : item.Uname,
            operator: 'eq',
            checked: item.checked,
            mainAttribute: item.mainAttribute
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
            else if(list[0].mainAttribute === 'Ernam' && itemToBeChecked === item.Uname){
                manipulateListItem(item)
                dispatch(changeLogActions.setCheckedAllAfterRendering(filteredList))
            }
            else if(list[0].mainAttribute === 'Aenam' && itemToBeChecked === item.Uname){
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