import { useState, useEffect } from 'react'
import Login from './components/Login'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)

    const fetchBlogs = async () => {
        const blogsFetched = await blogService.getAll()
        setBlogs( blogsFetched )
    }

    useEffect(() => {
        fetchBlogs()
        const userData = window.localStorage.getItem("blogAppUser")
        setUser(JSON.parse(userData))
    }, [])

    const onLoginPost = async (ev) => {
        ev.preventDefault()
        try {
            const userData = await loginService.login({
                userName,
                password
            })
            window.localStorage.setItem("blogAppUser", JSON.stringify(userData))
            setUser(userData)
            setUserName("")
            setPassword("")
        }
        catch(ex){
            setErrorMsg("Wrong Credentials")
            setTimeout(() => {
                setErrorMsg(null)
            }, 5000)
        }
    }

    const loginStates = {
        userName,
        setUserName,
        password,
        setPassword
    }

    return (
        <div>
            <h1>Blog App</h1>
            {errorMsg && <div>{errorMsg}</div>}
            {notification && <div>{notification}</div>}
            {!user
                ? <Login loginStates={loginStates} onLoginPost={onLoginPost} />
                : <BlogList userState={{user, setUser}} fetchBlogs={fetchBlogs} blogs={blogs} />
            }
        </div>
    )
}

export default App
