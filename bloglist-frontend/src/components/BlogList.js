import { useState, useEffect, useRef } from "react"
import Blog from "./Blog"
import Togglable from "./Togglable"
import Blogform from "./BlogForm"
import blogServices from "../services/blogs"

const BlogList = ({ userState, setNotification }) => {
    const { user, setUser } = userState
    const [blogs, setBlogs] = useState([])
    const blogFormRef = useRef()

    const logout = () => {
        window.localStorage.removeItem("blogAppUser")
        setUser(null)
        setNotification({
            msg: "Logged out succesfully",
            type: 0
        })
    }

    const fetchBlogs = async () => {
        const blogsFetched = await blogServices.getAll()
        setBlogs( blogsFetched )
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    useEffect(() => {
        if (blogFormRef.current.toggled) {
            blogFormRef.current.setToggled(false)
        }
    }, [blogs])


    return (
        <>
            <h2>Blogs</h2>
            <div>
                <label htmlFor="logout">{user.userName} is  logged in</label>
                <button id="logout" onClick={logout}>Log Out</button>
            </div>
            <h3>New blog</h3>
            <Togglable buttonText={"Create"} ref={blogFormRef}>
                <Blogform
                    user={user}
                    setNotification={setNotification}
                    fetchBlogs={fetchBlogs}
                />
            </Togglable>
            <h3>Blog entries</h3>
            {blogs.sort((a,b) => a.likes < b.likes).map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    user={user}
                    fetchBlogs={fetchBlogs}
                />
            )}
        </>
    )
}

export default BlogList
