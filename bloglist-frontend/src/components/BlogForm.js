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
        <form className="flex flex-col bg-black" onSubmit={onSubmitBlog}>
            <label className="block">
                <label className="block text-l font-medium text-gray-300">Title</label>
                <input className="mt-1 rounded px-2 py-1 bg-white border border-slate-600 text-gray-900
                focus:bg-slate-400"
                {...title}
                />
            </label>
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
