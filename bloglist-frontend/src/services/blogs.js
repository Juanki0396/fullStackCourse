import axios from "axios"
const baseUrl = "/api/blogs"

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const postOne = async (blogData, token) => {
    const headers = {
        Authorization: "Bearer " + token,
    }
    const res = await axios.post("/api/blogs", blogData, { headers })
    return res.data
}

const postComment = async (blogId, comment, token) => {
    const headers = {
        Authorization: "Bearer " + token,
    }
    const res = await axios.post(`/api/blogs/${blogId}/comments`, { comment }, { headers })
    return res.data
}

const putBlog = async (id, blogData, token) => {
    const headers = {
        Authorization: "Bearer " + token,
    }
    const res = await axios.put(`/api/blogs/${id}`, blogData, { headers })
    return res.data
}

const deleteBlog = async (id, token) => {
    const headers = {
        Authorization: "Bearer " + token,
    }
    const res = await axios.delete(`/api/blogs/${id}`, { headers })
    return res.data
}

export default { getAll, postOne, putBlog, deleteBlog, postComment }
