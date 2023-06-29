import { createContext, useContext } from "react";
import { useReducer } from "react";

const notiReducer = (state, action) => {
    console.log("Reducing action: ", action)
    switch(action.type) {
        case "SPAWN":
            return action.payload
        case "HIDE":
            return null
        default: 
            return state
    }
}

const NotificationContext = createContext()

export const NotiContextProvider = ({ children }) => {
    const [notiState, notiDispatch] = useReducer(notiReducer, null)

    return (
        <NotificationContext.Provider value={[notiState, notiDispatch]}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotiDispatch = () => {
    return useContext(NotificationContext)[1]
}

export const useNotiValue = () => {
    return useContext(NotificationContext)[0]
}

export const spawnNotification = (msg, dispatch) => {
    const action = {
        type: "SPAWN",
        payload: msg
    }
    dispatch(action)
    setTimeout(() => {
        const action = { type: "HIDE" }
        dispatch(action)
    }, 2000)
}

export default NotificationContext
