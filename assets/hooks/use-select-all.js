<<<<<<< HEAD
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

=======
const useSelectAll = (checkedAll, setCheckedAll, list, setList, filteredList, setFilteredList) => {
    function handleSelectAll(){
        setCheckedAll(!checkedAll)
        if(!checkedAll){
            if(filteredList.length === list.length){
                list.forEach((item,index) => {
                    item.checked = !item.checked
/*                     if(item.checked)
                        checkedItems.push(item.attribute) */
                })
        
                list.forEach((item,index) => {
                    if(!item.checked)
                        item.checked = true
                })
    
                setList(list.filter((item) => item.checked))
                setFilteredList(list)
>>>>>>> a293057e (MaterialType.js)
            }
            else{
                filteredList.forEach((item) => {
                    item.checked = !item.checked
<<<<<<< HEAD
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
=======
/*                     if(item.checked)
                        checkedItems.push(item.Mtart) */
                })
    
                filteredList.forEach((item,index) => {
                    if(!item.checked)
                        item.checked = true
                })                
                setFilteredList(filteredList)                
            }
        }
        else{
            filteredList.forEach((item,index) => {
                item.checked = !item.checked
            })
            setFilteredList(filteredList)
            setCheckedAll(false)
        }
>>>>>>> a293057e (MaterialType.js)
    }

    return {
        handleSelectAll
    }
}

export default useSelectAll