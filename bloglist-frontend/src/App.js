import { useState, useEffect } from "react"
import Login from "./components/Login"
import BlogList from "./components/BlogList"
import Notification from "./components/Notification"

const App = () => {
    const [notification, setNotification] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const userData = window.localStorage.getItem("blogAppUser")
        setUser(JSON.parse(userData))
    }, [])

    return (
        <div>
            <h1>Blog App</h1>
            <Notification notificationState={{ notification, setNotification }} />
            {!user
                ? <Login setUser={setUser} setNotification={setNotification} />
                : <BlogList userState={{ user, setUser }} setNotification={setNotification} />
            }
        </div>
    )
}

export default App
