import { useEffect } from "react"
import Login from "./components/Login"
import Notification from "./components/Notification"
import { useDispatch } from "react-redux"
import { fetchUser } from "./reducers/user"
import { Route, Routes } from "react-router-dom"
import UsersInfoView from "./components/UsersInfoView"
import BlogsView from "./components/BlogsView"
import Navbar from "./components/Navbar"
import UserInfoView from "./components/UserInfoView"
import LogoutView from "./components/LogoutView"
import HomeView from "./components/HomeView"

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    return (
        <div className="h-screen bg-gray-900 text-white">
            <Navbar />
            <Notification/>
            <div className="flex flex-col flex-nowrap p-5 mx-10 content-center justify-center space-y-4">
                <Routes>
                    <Route path="/" element={<HomeView />} />
                    <Route path="/users" element={<UsersInfoView />} />
                    <Route path="/users/:userName" element={<UserInfoView />} />
                    <Route path="/blogs/*" element={<BlogsView />} />
                    <Route path="/logout" element={<LogoutView />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
