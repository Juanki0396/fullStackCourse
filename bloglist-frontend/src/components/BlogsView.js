import { useEffect } from "react"
import Blogform from "./BlogForm"
import { useDispatch, useSelector } from "react-redux"
import { fetchBlogs } from "../reducers/blogs"
import { Routes, Route, useNavigate } from "react-router-dom"
import BlogList from "./BlogList"
import BlogInfoView from "./BlogInfoView"

const BlogsView = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user])

    useEffect(() => {
        dispatch(fetchBlogs())
    }, [])


    return (
        <>
            <h2 className="text-3xl text-center">Blogs</h2>
            <h3 className="text-xl">New blog</h3>
            <Blogform />
            <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/:id" element={<BlogInfoView />} />
            </Routes>
        </>
    )
}

export default BlogsView
