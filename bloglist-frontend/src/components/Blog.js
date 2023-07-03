import { useState } from "react"
import blogServices from "../services/blogs"

const Blog = ({ blog, user, fetchBlogs }) => {
    const [hide, setHide] = useState(true)

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
        const blogToPut = { ...blog }
        blogToPut.likes += 1
        blog.user = user.id
        try {
            await blogServices.putBlog(blog.id, blogToPut, user.token)
        } catch (ex) {
            console.error(ex.response)
        }
        fetchBlogs()
    }

    const deleteBlog = async () => {
        if (
            !window.confirm(
                `Do you want to delete ${blog.title} by ${blog.author}`
            )
        ) {
            return null
        }
        try {
            await blogServices.deleteBlog(blog.id, user.token)
        } catch (ex) {
            console.error(ex.response)
        }
        fetchBlogs()
    }

    return (
        <div style={blogStyle}>
            <div className="blog-basic">
                <p style={{ display: "inline" }}>
                    <b>{blog.title}</b> by <i>{blog.author}</i>
                </p>
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
                <button style={deleteStyle} onClick={deleteBlog}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Blog
