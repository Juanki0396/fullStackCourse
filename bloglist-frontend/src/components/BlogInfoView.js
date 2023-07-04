import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addLike, fetchBlogs, deleteBlog, commentBlog } from "../reducers/blogs"
import { useField } from "../hooks"

const BlogInfoView = () => {
    const blogId = useParams().id
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [comment, resetComment] = useField("comment", "text")

    if(blogs.length === 0) {
        return null
    }

    const blog = blogs.filter(b => b.id === blogId)[0]

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

    const onComment = e => {
        e.preventDefault()
        dispatch(commentBlog(blogId, comment.value, user.token))
        resetComment()
    }

    return (
        <>
            <h2>{blog.title}</h2>
            <div>URL: <a href={blog.url}>{blog.url}</a></div>
            <div>
                Likes: {blog.likes}
                <button onClick={likePost}>Like</button>
            </div>
            <div>User: {blog.user.userName}</div>
            <div>
                <button onClick={onDelete}>
                    Delete
                </button>
            </div>
            <h3>Comments</h3>
            <form onSubmit={onComment}>
                <input {...comment} />
                <button type="submit">Comment</button>
            </form>
            <ul>
                {blog.comments.map((c,i) => <li key={blogId + i}>{c.msg}</li>)}
            </ul>
        </>
    )
}

export default BlogInfoView
