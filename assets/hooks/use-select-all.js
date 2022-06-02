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
            }
            else{
                filteredList.forEach((item) => {
                    item.checked = !item.checked
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
    }

    return {
        handleSelectAll
    }
}

export default useSelectAll