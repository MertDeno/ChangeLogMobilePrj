import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { changeLogActions } from "../redux/change-log-reducers"

let searchValue = ""

function useSearch(list, setFilteredList){
    const dispatch = useDispatch()

    function searchHandler(enteredValue){
        debugger
        searchValue = enteredValue.toUpperCase()
        const newData = list.filter((item) => {
            if(list[0].mainAttribute != 'Ernam' && list[0].mainAttribute != 'Aenam')
                return item[list[0].mainAttribute].includes(searchValue)
            else{
                return item.Uname.includes(searchValue)
            }
        })
    
        for (let index = 0; index < newData.length; index++) {
            const item = newData[index];
            if(!item.checked){
                dispatch(changeLogActions.setCheckedAll(false))
                break
            }
            else{
                dispatch(changeLogActions.setCheckedAll(true))
            }
        }
    
        setFilteredList(newData)  
    }
    
    useEffect(() => {
        searchValue = ''
        searchValue.trim()
    },[])

    return {
        searchValue,
        searchHandler
    }
}

export default useSearch