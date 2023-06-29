import { useReducer, createContext, useContext } from "react";

const notiReducer = (state, { type, payload }) => {
    switch(type) {
        case "SPAWN":
            return payload
        case "HIDE":
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
    const [value, dispatch] = useReducer(notiReducer, null)

    return(
        <NotificationContext.Provider value={[value, dispatch]}>
            {children}
        </NotificationContext.Provider>
    )
}

export const makeNotification = (msg, secs, dispatch) => {
    const setAction = {
        type: "SPAWN",
        payload: msg
    }
    dispatch(setAction)
    setTimeout(() => {
        const hideAction = { type: "HIDE" }
        dispatch(hideAction)
    }, secs * 1000)
}

export const useNotificationValue = () => {
    return useContext(NotificationContext)[0]
}

export const useNotificationDispatch = () => {
    return useContext(NotificationContext)[1]
}

export default NotificationContext

