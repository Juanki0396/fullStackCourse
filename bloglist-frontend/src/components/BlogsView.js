import { useEffect, useRef } from "react"
import Blog from "./Blog"
import Togglable from "./Togglable"
import Blogform from "./BlogForm"
import { useDispatch, useSelector } from "react-redux"
import { createNotification } from "../reducers/notification"
import { fetchBlogs } from "../reducers/blogs"
import { cleanUser } from "../reducers/user"

const BlogsView = () => {
    const blogFormRef = useRef()
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    const logout = () => {
        dispatch(cleanUser())
        dispatch(createNotification("Logged out succesfully",3))
    }

    useEffect(() => {
        dispatch(fetchBlogs())
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
                <label htmlFor="logout">{user.userName} is logged in</label>
                <button id="logout" onClick={logout}>
                    Log Out
                </button>
            </div>
            <h3>New blog</h3>
            <Togglable buttonText={"Create"} ref={blogFormRef}>
                <Blogform />
            </Togglable>
            <h3>Blog entries</h3>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                />
            ))}
        </>
    )
}

export default BlogsView
