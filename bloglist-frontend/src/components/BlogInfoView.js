import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const BlogInfoView = () => {
    const blogId = useParams().id
    const blog = useSelector(state => state.blogs.filter(b => b.id === blogId)[0])

    return (
        <h2>{blog.title}</h2>
    )
}

export default BlogInfoView
