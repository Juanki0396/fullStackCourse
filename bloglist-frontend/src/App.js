import { useEffect } from "react"
import Login from "./components/Login"
import Notification from "./components/Notification"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "./reducers/user"
import { Route, Routes } from "react-router-dom"
import UsersInfoView from "./components/UsersInfoView"
import BlogsView from "./components/BlogsView"
import Navbar from "./components/Navbar"
import UserInfoView from "./components/UserInfoView"
import BlogInfoView from "./components/BlogInfoView"

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    const MainPage = () => {
        if (user) {
            return <BlogsView />
        }
        return <Login />
    }


    return (
        <div>
            <h1>Blog App</h1>
            <Navbar />
            <Notification/>
            <Routes>
                <Route path="/users" element={<UsersInfoView />} />
                <Route path="/users/:userName" element={<UserInfoView />} />
                <Route path="/blogs/:id" element={<BlogInfoView />} />
                <Route path="/" element={<MainPage />} />
            </Routes>
        </div>
    )
}

export default App
