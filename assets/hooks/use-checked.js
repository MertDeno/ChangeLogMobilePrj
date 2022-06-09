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

    function isAllElementsChecked({checkedElements, list, filteredList}){
        let elements = {checkedElements, list, filteredList}
        let checkedElementsLength = elements.checkedElements.length
        let listLength = elements.list.length
        let filteredListLength = elements.filteredList.length
    
        return checkedElementsLength === listLength || checkedElementsLength === filteredListLength
    }

    function handleOnChange(itemToBeChecked){
        debugger
        filteredList.forEach((item) => {
            if(itemToBeChecked === item[list[0].mainAttribute]){
                manipulateListItem(item)
                setCheckedAll(false)
            }
            else{
                return item.checked
            }
        })

        setAllLists(list, filteredList)
        isAllElementsChecked({checkedElements, list, filteredList}) ? setCheckedAll(true) : false
    }
 
    return {
        handleOnChange
    }
}

export default useChecked