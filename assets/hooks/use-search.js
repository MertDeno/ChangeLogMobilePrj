let searchValue = ""

function useSearch(setCheckedAll, list, setFilteredList){
    function searchHandler(enteredValue){
        debugger
        searchValue = enteredValue.toUpperCase()
        const newData = list.filter((item) => {
            return item[list[0].mainAttribute].includes(searchValue)
        })
    
        for (let index = 0; index < newData.length; index++) {
            const item = newData[index];
            if(!item.checked){
                setCheckedAll(false)
                break
            }
            else{
                setCheckedAll(true)
            }
        }
    
        setFilteredList(newData)  
    }
    
    return {
        searchValue,
        searchHandler
    }
}

export default useSearch