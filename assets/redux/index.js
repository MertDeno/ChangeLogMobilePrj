import { configureStore } from "@reduxjs/toolkit";
import changeLogReducers from "./change-log-reducers";

const store = configureStore({
    reducer: { changeLog: changeLogReducers }
})

export default store