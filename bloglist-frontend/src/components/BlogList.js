import { useState } from "react"
import Blog from "./Blog"
import blogServices from "../services/blogs"

const BlogList = ({userState, blogs, fetchBlogs}) => {
    const { user, setUser } = userState
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const logout = () => {
        window.localStorage.removeItem("blogAppUser")
        setUser(null)
    }


    const onSubmitBlog = async (ev) => {
        ev.preventDefault()
        const blogToSubmit = {
            title,
            author,
            url
        }
        
        try {
            await blogServices.postOne(blogToSubmit, user.token)
            fetchBlogs()
            setTitle("")
            setAuthor("")
            setUrl("")
        }
        catch(ex) {
            console.error(ex)
        }

    }

    return (
        <>
            <h2>Blogs</h2>
            <div>
                <label htmlFor="logout">{user.userName} is  logged in</label> 
                <button id="logout" onClick={logout}>Log Out</button>
            </div>
            <h3>Create new blog</h3>
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
                <button type="submit">Create</button>
            </form>
            <h3>Entries</h3>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </>
    )
}

export default BlogList
