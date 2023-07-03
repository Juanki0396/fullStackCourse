import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: "notification",
    initialState: null,
    reducers:{
        addNotification: (state, action) => {
            return {
                msg: action.payload,
                type: "INFO",
            }
        },
        addError: (state, action) => {
            return {
                msg: action.payload,
                type: "ERROR",
            }
        },
        resetNotification: () => {
            return null
        }
    }
})

export const { addNotification, addError, resetNotification } = notificationSlice.actions

export const createNotification = (msg, secs) => {
    return dispatch => {
        dispatch(addNotification(msg))
        setTimeout(() => {
            dispatch(resetNotification())
        }, secs * 1000)
    }
}

export const createError = (msg, secs) => {
    return dispatch => {
        dispatch(addError(msg))
        setTimeout(() => {
            dispatch(resetNotification())
        }, secs * 1000)
    }
}


export default notificationSlice.reducer
