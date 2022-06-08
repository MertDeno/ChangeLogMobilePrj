<<<<<<< HEAD
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
=======
const useSelectAll = (checkedAll, setCheckedAll, list, filteredList, setFilteredList) => {
>>>>>>> 9b1199f4 (Only updates with selecting Material Types)
    function handleSelectAll(){
        setCheckedAll(!checkedAll)

        if(!checkedAll){
            debugger
            if(filteredList.length === list.length){
                list.forEach((item) => {
                    item.checked = !item.checked
                })
        
                list.forEach((item) => {
                    if(!item.checked)
                        item.checked = true
                })
<<<<<<< HEAD
    
                setList(list.filter((item) => item.checked))
                setFilteredList(list)
>>>>>>> a293057e (MaterialType.js)
=======
>>>>>>> 9b1199f4 (Only updates with selecting Material Types)
            }
            else{
                filteredList.forEach((item) => {
                    item.checked = !item.checked
<<<<<<< HEAD
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
=======
>>>>>>> 9b1199f4 (Only updates with selecting Material Types)
                })
    
                filteredList.forEach((item) => {
                    if(!item.checked)
                        item.checked = true
                })                
            }              
        }
        else{
            filteredList.forEach((item) => {
                item.checked = !item.checked
            })

            setCheckedAll(false)
        }
<<<<<<< HEAD
>>>>>>> a293057e (MaterialType.js)
=======

        setFilteredList(filteredList)
>>>>>>> 9b1199f4 (Only updates with selecting Material Types)
    }

    return {
        handleSelectAll
    }
}

export default useSelectAll