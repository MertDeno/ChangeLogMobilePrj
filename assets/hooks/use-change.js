import { useDispatch } from "react-redux"
import { changeLogActions } from "../redux/change-log-reducers"

function useChange(setCheckedAll, list, setList, filteredList, setFilteredList){
    const dispatch = useDispatch()
    let checkedElements = []
    function handleOnChange(itemToBeChecked){
        if(filteredList.length === list.length){
            list.forEach((item) => {
                if(itemToBeChecked === item[list[0].mainAttribute]){
                    item.checked = !item.checked
                    setCheckedAll(false)
                    return item.checked
                }
                else{
                    item.checked = item.checked
                    return item.checked
                }
            })
        
            setList(list.filter((item) => item))        
            setFilteredList(list)
    
            list.forEach((item) => {
                if(item.checked){
                    checkedElements.push(item[list[0].mainAttribute])
                }
            })            
        }
        else{
            filteredList.forEach((item) => {
                if(itemToBeChecked === item[list[0].mainAttribute]){
                    item.checked = !item.checked
                    setCheckedAll(false)
                    return item.checked
                }
                else{
                    item.checked = item.checked
                    return item.checked
                }
            })
            setList(list.filter((item) => item))               
            setFilteredList(filteredList)
    
            filteredList.forEach((item) => {
                if(item.checked){
                    checkedElements.push(item[list[0].mainAttribute])
                }
            })                 
        }                
        dispatch(changeLogActions.getCheckedMaterialTypes(checkedElements))
        checkedElements.length === list.length || checkedElements.length === filteredList.length ? setCheckedAll(true) : false
    }
 
    return {
        handleOnChange
    }
}

export default useChange