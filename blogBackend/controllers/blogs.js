const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const { userExtractor }  = require("../utils/middleware")
//const logger = require("../utils/logger")

blogRouter.get("/", async (_, response) => {
    const blogs = await Blog
        .find({})
        .populate(
            "user",
            { userName:1, name: 1 }
        )

    response.json(blogs)
})

blogRouter.post("/", userExtractor, async (request, response, next) => {
    const { user , body } = request

    try {
        const blog = new Blog({
            ...body,
            user: user.id
        })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(blog)
        await user.save()
        response.status(201).json(savedBlog)
    }
    catch (ex){
        next(ex)
    }
})

blogRouter.delete("/:id", userExtractor, async (req, res, next) => {
    const blogId = req.params.id
    const { user } = req

    try {
        const deletedBlog = await Blog.findById(blogId)
        if (!deletedBlog) {
            return res.status(404).end()
        }
        else if (deletedBlog.user.toString() !== user.id) {
            return res.status(401).send({error: "invalid token"})
        }
        await Blog.findByIdAndRemove(blogId)
        res.status(204).end()
    }
    catch(ex) {
        next(ex)
    }
})

blogRouter.put("/:id", userExtractor, async (req, res, next) => {
    const id = req.params.id
    const user = req.user
    const { title, author, url, likes } = req.body

    try {
        const blogToUpdate = await Blog.findById(id) 
        if(!blogToUpdate || blogToUpdate.user.toString() === user.id) {
            const updatedBlog = await Blog.findByIdAndUpdate(
                id,
                { title, author, url, likes, user: user.id }, 
                {new: true, runValidators: true, context: "query"}
            )
            res.json(updatedBlog)
        }
        else {
            return res.status(401).send({error: "invalid token"})
        }
    }
    catch(ex) {
        next(ex)
    }
    
})

module.exports = blogRouter
