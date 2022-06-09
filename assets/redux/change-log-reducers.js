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
            if(state.checkedElements.length !== 0){
                const newArray = action.payload
                const newArrayChecked = state.checkedElements

                newArray.forEach(element => {
                    for (let index = 0; index < newArrayChecked.length; index++) {
                        const item = newArrayChecked[index];
                        if(element[element.mainAttribute] === item.oValue1){
                            element.checked = true
                        }
                    }
                });
            }
            else{
                return
            }
        },
        updateFetchedElement(state, action){
            debugger
            const existingItem = state.fetchedElements.find(item=>
                item.sPath === action.payload.sPath
            )

            existingItem.checked = !existingItem.checked
        }
    })
})

export default changeLogSlice.reducer
export const changeLogActions = changeLogSlice.actions