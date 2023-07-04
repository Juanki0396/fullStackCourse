import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { cleanUser } from "../reducers/user"
import { createNotification } from "../reducers/notification"
import { useEffect } from "react"

const LogoutView = () => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])

    if (!user) {
        return null
    }

    const logout = () => {
        dispatch(cleanUser())
        dispatch(createNotification("Logged out succesfully",3))
    }
    const cancel = () => {
        navigate("/")
    }

    return (
        <div>
            <p>{user.userName}, are you sure to log out</p>
            <button id="logout" onClick={logout}>
                Log Out
            </button>
            <button onClick={cancel}>
                Cancel
            </button>
        </div>
    )
}

export default LogoutView
