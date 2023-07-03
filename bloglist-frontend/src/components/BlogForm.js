import { useState } from "react"
import blogServices from "../services/blogs"

const Blogform = ({ user, setNotification, fetchBlogs }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const onSubmitBlog = async (ev) => {
        ev.preventDefault()
        const blogToSubmit = {
            title,
            author,
            url,
        }

        try {
            await blogServices.postOne(blogToSubmit, user.token)
            fetchBlogs()
            setTitle("")
            setAuthor("")
            setUrl("")
        } catch (ex) {
            setNotification({
                msg: ex.response.data.error,
                type: 1,
            })
        }
    }

    return (
        <form onSubmit={onSubmitBlog}>
            <div>
                <label htmlFor="blogTitle">Title: </label>
                <input
                    id="blogTitle"
                    type="text"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                <label htmlFor="blogAuthor">Author: </label>
                <input
                    id="blogAuthor"
                    type="text"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                <label htmlFor="blogUrl">Url: </label>
                <input
                    id="blogUrl"
                    type="text"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button className="submitButton" type="submit">
                Submit
            </button>
        </form>
    )
}

export default Blogform
