import { createSlice } from "@reduxjs/toolkit";

const initialChangeLogState = { checkedElements: [], isAllSelected: false, searchValue: '', showSnackbar: false }

const changeLogSlice =  createSlice({
    name: 'ChangeLogSlice',
    initialState: initialChangeLogState,
    reducers: ({
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
        },
        resetFilterList(state){
            if(state.checkedElements.length > 0)
                state.checkedElements = []
        },
        setShowSnackbar(state, action){
            state.showSnackbar = action.payload
        }
    })
})

export default changeLogSlice.reducer
export const changeLogActions = changeLogSlice.actions