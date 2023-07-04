import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import { createError, createNotification } from "./notification"

const localStorageUserKey = "blogAppUser"

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            window.localStorage.setItem(localStorageUserKey, JSON.stringify(action.payload))
            return action.payload
        },
        fetchUser: (state) => {
            const localUserData = window.localStorage.getItem(localStorageUserKey)
            if(localUserData){
                return JSON.parse(localUserData)
            }
            return state
        },
        cleanUser: () => {
            window.localStorage.removeItem(localStorageUserKey)
            return null
        }
    }
})

export const { setUser, cleanUser, fetchUser } = userSlice.actions

export const loginUser = (userName, password) => {
    return async dispatch => {
        try {
            const userData = await loginService.login({ userName, password })
            dispatch(setUser(userData))
            dispatch(createNotification(`Welcome again ${userData.userName}`, 3))
        } catch(ex) {
            dispatch(createError("Wrong Credentials", 3))
        }
    }
}

export default userSlice.reducer
