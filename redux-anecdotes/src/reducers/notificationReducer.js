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
    
export const spawnNotification = (msg, sec) => {
    return dispatch => {
        dispatch(setNotification(msg))
        setTimeout(() => {
            dispatch(cleanNotification())
        }, sec * 1000)
    }
}

export default notificationSlice.reducer
