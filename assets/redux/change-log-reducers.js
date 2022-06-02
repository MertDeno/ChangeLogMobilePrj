import { createSlice } from "@reduxjs/toolkit";

const initialChangeLogState = { checkedElements: [], sPath: '', sOperator: '', value: '' }

const changeLogSlice =  createSlice({
    name: 'ChangeLogSlice',
    initialState: initialChangeLogState,
    reducers: ({
        getCheckedMaterialTypes(state, action){
            debugger
            state.checkedElements.push(action.payload)
        }
    })
})

export default changeLogSlice.reducer
export const changeLogActions = changeLogSlice.actions