import { createSlice } from "@reduxjs/toolkit"
import blogServices from "../services/blogs"

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setAllBlogs: (state, action) => {
            return action.payload
        },
        addBlog: (state, action) => {
            state.push(action.payload)
        },
        sortBlogs: (state) => {
            state.sort((a, b) => a.likes < b.likes)
        },
        deleteOneBlog: (state, action) => {
            return state.filter(b => b.id !== action.payload)
        },
        updateBlog: (state, action) => {
            const idx = state.findIndex(b => b.id === action.payload.id)
            state[idx] = action.payload
        },
        likeOneBlog: (state, action) => {
            const idx = state.findIndex(b => b.id === action.payload)
            state[idx].likes += 1
        }
    }
})


export const { setAllBlogs, addBlog, sortBlogs, deleteOneBlog, likeOneBlog, updateBlog } = blogSlice.actions

export const fetchBlogs =  () => {
    return async dispatch => {
        const blogsFetched = await blogServices.getAll()
        dispatch(setAllBlogs(blogsFetched))
        dispatch(sortBlogs())
    }
}

export const deleteBlog =  (id, tk) => {
    return async dispatch => {
        await blogServices.deleteBlog(id, tk)
        dispatch(deleteOneBlog(id))
    }
}

export const addLike = (blog, tk) => {
    return async dispatch  => {
        const blogToPut = { ...blog }
        blogToPut.likes += 1
        const updatedBlog = await blogServices.putBlog(blog.id, blogToPut, tk)
        dispatch(likeOneBlog(updatedBlog.id))
        dispatch(sortBlogs())
    }
}

export const commentBlog = (blogId, comment, tk) => {
    return async dispatch => {
        const updatedBlog = await blogServices.postComment(blogId, comment, tk)
        dispatch(updateBlog(updatedBlog))
        dispatch(sortBlogs())
    }
}

export default blogSlice.reducer
