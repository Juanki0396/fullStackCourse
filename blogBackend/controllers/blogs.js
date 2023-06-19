const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const logger = require("../utils/logger")

blogRouter.get("/", async (_, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)
})

blogRouter.post("/", async (request, response, next) => {
    const blog = new Blog(request.body)
    
    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }
    catch (ex){
        next(ex)
    }
})

blogRouter.delete("/:id", async (req, res, next) => {
    const id = req.params.id

    try {
        const deletedBlog = await Blog.findByIdAndRemove(id)
        const exitCode = deletedBlog ? 204 : 404
        res.status(exitCode).end()
    }
    catch(ex) {
        next(ex)
    }
})

blogRouter.put("/:id", async (req, res, next) => {
    const id = req.params.id
    const { title, author, url, likes } = req.body
    
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, author, url, likes}, 
            {new: true, runValidators: true, context: "query"}
        )
        res.json(updatedBlog)
    }
    catch(ex) {
        next(ex)
    }
    
})

module.exports = blogRouter
