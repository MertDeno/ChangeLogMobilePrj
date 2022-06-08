const useSelectAll = (checkedAll, setCheckedAll, list, filteredList, setFilteredList) => {
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
            }
            else{
                filteredList.forEach((item) => {
                    item.checked = !item.checked
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

        setFilteredList(filteredList)
    }

    return {
        handleSelectAll
    }
}

export default useSelectAll