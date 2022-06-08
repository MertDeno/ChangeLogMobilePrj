import { createSlice } from "@reduxjs/toolkit";

<<<<<<< HEAD
<<<<<<< HEAD
const initialChangeLogState = { checkedElements: [], isAllSelected: false, searchValue: '' }
=======
const initialChangeLogState = { checkedElements: [], sPath: '', sOperator: '', value: '' }
>>>>>>> a293057e (MaterialType.js)
=======
const initialChangeLogState = { checkedElements: [], itemChecked: false, fetchedElements: [] }
>>>>>>> 9b1199f4 (Only updates with selecting Material Types)

const changeLogSlice =  createSlice({
    name: 'ChangeLogSlice',
    initialState: initialChangeLogState,
    reducers: ({
<<<<<<< HEAD
<<<<<<< HEAD
        addCheckedElements(state, action){
            debugger
            const existingItem = state.checkedElements.find((item) => 
                item.id === action.payload.id    
            )

            if(!existingItem){
                state.checkedElements.push(action.payload)
            }
            
            else if(action.payload.checked && existingItem.checked){
                return
            }
            
            else {
                state.checkedElements = state.checkedElements.filter(item=>item.id !== action.payload.id)
            }
        },
        setCheckedAll(state, action){
            debugger
            state.isAllSelected = action.payload
        },
        setCheckedAllAfterRendering(state, action){
            debugger
            state.isAllSelected = action.payload.every(element => element.checked === true)
        },
        setFetchedElements(state, action){
            debugger
            if(state.checkedElements){
                const newArray = action.payload
                const newArrayChecked = state.checkedElements

                newArray.forEach(element => {
                    for (let index = 0; index < newArrayChecked.length; index++) {
                        const item = newArrayChecked[index];
                        debugger
                        if(element[element.mainAttribute] === item.oValue1 && element.mainAttribute === item.sPath){
                            element.checked = true
                        }
                    }
                });
            }
            else{
                return
            }
        },
        resetSearchValueToDefault(state, action){
            state.searchValue = action.payload
=======
        getCheckedMaterialTypes(state, action){
            debugger
            state.checkedElements.push(action.payload)
>>>>>>> a293057e (MaterialType.js)
=======
        addCheckedElements(state, action){
            debugger
            const existingItem = state.checkedElements.find((item) => 
                item.id === action.payload.id    
            )

            if(!existingItem){
                state.checkedElements.push(action.payload)
            }
            
            else {
                state.checkedElements = state.checkedElements.filter(item=>item.id !== action.payload.id)
            }
        },
        setFetchedElements(state, action){
            debugger
            if(state.fetchedElements.length === 0){
                state.fetchedElements = action.payload
            }
        },
        updateFetchedElement(state, action){
            debugger
            const existingItem = state.fetchedElements.find(item=>
                item.Mtart === action.payload.Mtart
            )

            existingItem.checked = !existingItem.checked
>>>>>>> 9b1199f4 (Only updates with selecting Material Types)
        }
    })
})

export default changeLogSlice.reducer
export const changeLogActions = changeLogSlice.actions