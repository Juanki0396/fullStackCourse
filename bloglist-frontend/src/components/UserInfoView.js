import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import usersService from "../services/users"

const UserInfoView = () => {
    const userName = useParams().userName
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        usersService
            .getOneUser(userName)
            .then(data => setBlogs(data.blogs))
    }, [])

    return (
        <>
            <h2>{userName}</h2>
            <h3>added blogs</h3>
            <ul>
                {blogs.map(b => <li key={userName+b.title}>{b.title}</li>)}
            </ul>
        </>
    )
}

export default UserInfoView

