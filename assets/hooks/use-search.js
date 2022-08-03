<<<<<<< HEAD
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { changeLogActions } from "../redux/change-log-reducers"

let searchValue = ""

function useSearch(list, setFilteredList){
    const dispatch = useDispatch()

=======
let searchValue = ""

function useSearch(setCheckedAll, list, setFilteredList){
>>>>>>> a293057e (MaterialType.js)
    function searchHandler(enteredValue){
        debugger
        searchValue = enteredValue.toUpperCase()
        const newData = list.filter((item) => {
            return item[list[0].mainAttribute].includes(searchValue)
        })
    
        for (let index = 0; index < newData.length; index++) {
            const item = newData[index];
            if(!item.checked){
<<<<<<< HEAD
                dispatch(changeLogActions.setCheckedAll(false))
                break
            }
            else{
                dispatch(changeLogActions.setCheckedAll(true))
=======
                setCheckedAll(false)
                break
            }
            else{
                setCheckedAll(true)
>>>>>>> a293057e (MaterialType.js)
            }
        }
    
        setFilteredList(newData)  
    }
    
<<<<<<< HEAD
    useEffect(() => {
        searchValue = ''
    },[])

=======
>>>>>>> a293057e (MaterialType.js)
    return {
        searchValue,
        searchHandler
    }
}

export default useSearch