import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        setNotification(state, action){
            return action.payload
        },
        cleanNotification(state, action){
            return ""
        }
    }
})

export const { setNotification, cleanNotification } = notificationSlice.actions
export default notificationSlice.reducer
