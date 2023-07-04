import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    }

    return (
        <div style={blogStyle}>
            <Link style={{ display: "inline" }} to={`/blogs/${blog.id}`}>
                <b>{blog.title}</b> by <i>{blog.author}</i>
            </Link>
        </div>
    )
}

export default Blog
