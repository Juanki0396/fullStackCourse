import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBlogs, deleteBlog, addLike } from "../reducers/blogs"
import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
    const [hide, setHide] = useState(true)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    }

    const hideOnHide = {
        display: hide ? "none" : "",
    }

    const buttonText = hide ? "Show" : "Hide"

    const deleteStyle = {
        display: user.userName === blog.user.userName ? "" : "none",
        color: "blue",
    }

    const toggle = () => {
        setHide(!hide)
    }

    const likePost = async () => {
        try {
            dispatch(addLike(blog, user.token))
        } catch (ex) {
            console.error(ex.response)
        }
        dispatch(fetchBlogs())
    }

    const onDelete = async () => {
        const confirmation = window.confirm(`Do you want to delete ${blog.title} by ${blog.author}`)
        if (!confirmation) {
            return null
        }
        try {
            dispatch(deleteBlog(blog.id, user.token))
        } catch (ex) {
            console.error(ex.response)
        }
        dispatch(fetchBlogs())
    }

    return (
        <div style={blogStyle}>
            <div className="blog-basic">
                <Link style={{ display: "inline" }} to={`/blogs/${blog.id}`}>
                    <b>{blog.title}</b> by <i>{blog.author}</i>
                </Link>
                <button onClick={toggle}>{buttonText}</button>
            </div>
            <div className="blog-extra" style={hideOnHide}>
                <p style={{ display: "inline" }}>
                    Url: <a href={blog.url}>{blog.url}</a>
                </p>
                <br />
                <p style={{ display: "inline" }}>Likes: {blog.likes}</p>
                <button onClick={likePost}>Like</button>
                <br />
                <p style={{ display: "inline" }}>User: {blog.user.userName}</p>
                <br />
                <button style={deleteStyle} onClick={onDelete}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Blog
