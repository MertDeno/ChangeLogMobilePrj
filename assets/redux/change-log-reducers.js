import { createSlice } from "@reduxjs/toolkit";

const initialChangeLogState = { 
    checkedElements: [], 
    isAllSelected: false, 
    showSnackbar: false, 
    filteredNumbersOfMaterial: 0, 
    elementsFetched: false,
    createdDateStart: '',
    createdDateEnd: '',
    changedDateStart: '',
    changedDateEnd: ''
}

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
            
            else if(action.payload.checked && existingItem.checked && action.payload.sPath != 'Ersda'){
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
            state.isAllSelected = action.payload.every(element => element.checked === true)
        },
        setFetchedElements(state, action){
            if(state.checkedElements.length > 0){
                debugger
                const newArray = action.payload
                const newArrayChecked = state.checkedElements

                newArray.forEach(element => {
                    for (let index = 0; index < newArrayChecked.length; index++) {
                        const item = newArrayChecked[index];

                        if(element[element.mainAttribute] === item.oValue1 && element.mainAttribute === item.sPath){
                            debugger
                            element.key = item.id
                            element.checked = !element.checked
                        }
                        else if(element.mainAttribute === 'Ernam' && item.oValue1 === element.Uname){
                            element.key = item.id
                            element.checked = true
                        }
                        else if(element.mainAttribute === 'Aenam' && item.oValue1 === element.Uname){
                            element.key = item.id
                            element.checked = true
                        }
                    }
                });

            }
            else{
                return
            }
        },
        setElementsFetched(state){
            debugger
            state.elementsFetched = true
        },
        resetFilterList(state){
            if(state.checkedElements.length > 0){
                state.checkedElements = []
            }
            state.createdDateStart = ''
            state.createdDateEnd = ''
            state.changedDateStart = ''
            state.changedDateEnd = ''
        },
        setShowSnackbar(state, action){
            state.showSnackbar = action.payload
        },
        setFilteredNumbersOfMaterial(state, action){
            state.filteredMaterialNumber = action.payload
        },
         setCreatedStartDate(state, action){
            debugger
            state.createdDateStart = action.payload
        },
        setCreatedEndDate(state, action){
            debugger
            state.createdDateEnd = action.payload
        },
        setChangedStartDate(state, action){
            debugger
            state.changedDateStart = action.payload
        },
        setChangedEndDate(state, action){
            debugger
            state.changedDateEnd = action.payload
        },
        addOrUpdateDate(state, action){
            debugger
            const existingItem = state.checkedElements.find((item) => 
                action.payload.sPath === 'Ersda' ? item.sPath === 'Ersda' : item.sPath === 'Laeda'   
            )

            if(!existingItem){
                state.checkedElements.push(action.payload)
            }
            
            else{
                const arrayToCheck = state.checkedElements
                for (let index = 0; index < arrayToCheck.length; index++) {
                    const element = arrayToCheck[index];
                    if(element.sPath === action.payload.sPath){
                        element.oValue1 = action.payload.oValue1
                        element.oValue2 = action.payload.oValue2
                        break
                    }
                }

                state.createdDateStart = action.payload.oValue1,
                state.createdDateEnd = action.payload.oValue2
            }
        }
    })
})

export default changeLogSlice.reducer
export const changeLogActions = changeLogSlice.actions