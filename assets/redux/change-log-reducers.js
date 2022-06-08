import { createSlice } from "@reduxjs/toolkit";

const initialChangeLogState = { checkedElements: [], itemChecked: false, fetchedElements: [] }

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
        }
    })
})

export default changeLogSlice.reducer
export const changeLogActions = changeLogSlice.actions