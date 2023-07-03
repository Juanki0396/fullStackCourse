import blogServices from "../services/blogs"
import { useDispatch, useSelector } from "react-redux"
import { createError, createNotification } from "../reducers/notification"
import { fetchBlogs } from "../reducers/blogs"
import { useField } from "../hooks"

const Blogform = () => {
    const [title, resetTitle] = useField("title", "text")
    const [author, resetAuthor] = useField("author", "text")
    const [url, resetUrl] = useField("url", "text")
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const onSubmitBlog = async (ev) => {
        ev.preventDefault()
        const blogToSubmit = {
            title: title.value,
            author: author.value,
            url: url.value,
        }

        try {
            await blogServices.postOne(blogToSubmit, user.token)
            dispatch(fetchBlogs())
            dispatch(createNotification("New blog posted", 3))
            resetTitle()
            resetAuthor()
            resetUrl()
        } catch (ex) {
            dispatch(createError(ex.response.data.error, 3))
        }
    }

    return (
        <form onSubmit={onSubmitBlog}>
            <div>
                <label htmlFor="blogTitle">Title: </label>
                <input {...title} />
            </div>
            <div>
                <label htmlFor="blogAuthor">Author: </label>
                <input {...author} />
            </div>
            <div>
                <label htmlFor="blogUrl">Url: </label>
                <input {...url} />
            </div>
            <button className="submitButton" type="submit">
                Submit
            </button>
        </form>
    )
}

export default Blogform
