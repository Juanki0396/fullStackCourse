const mongoose = require("mongoose")
const supertest = require("supertest")
const Blog = require("../models/blog")
const helper = require("./helper.initialBlogs")
const app = require("../app")
const api = supertest(app)


beforeAll(async () => {
    await Blog.deleteMany({})
    for (let blog of helper.initialBlogs) {
        let blogObject = Blog(blog)
        await blogObject.save()
    }
})

describe("Getting all blogs", () => {
    test("blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("There are 2 blogs in DB", async () => {
        const res = await api.get("/api/blogs")

        expect(res.body).toHaveLength(2)
    })

    test("First blog is Hello World", async () => {
        const res = await api.get("/api/blogs")

        expect(res.body[0].title).toBe("Hello World")
    })
    
    test("Verify id property exists", async () => {
        const res = await api.get("/api/blogs")

        expect(res.body[0].id).toBeDefined()
        expect(res.body[0]._id).toBeFalsy()
    })
})

describe("Post blogs", () => {
    test("Post 1 blog", async () => {
        const blog = {
            title: "Canelones",
            author: "Joseba",
            url: "www.fritangada.com",
            likes: 333
        }
        
        const res = await api.post("/api/blogs").send(blog).expect(201)
        expect(res.body.title).toBe(blog.title)

        const res2 = await api.get("/api/blogs")
        expect(res2.body).toHaveLength(3)

    })

    test("likes is set to 0 if not setted while posting", async () => {
        const blog = {
            title: "Mierda",
            author: "POP",
            url: "www.shit.com",
        }
        
        const res = await api.post("/api/blogs").send(blog).expect(201)
        expect(res.body.likes).toBe(0)
    })

    test("title is required", async () => {
        const blog = {
            author: "POP",
            url: "www.shit.com",
        }
        
        await api.post("/api/blogs").send(blog).expect(400)
    })

    test("author is required", async () => {
        const blog = {
            title: "POP",
            url: "www.shit.com",
        }
        
        await api.post("/api/blogs").send(blog).expect(400)
    })

})

describe("Deleting blogs", () => {
    test("Deleting  existing blog", async () => {
        const blogs = await helper.blogsInDb()
        const id = blogs[0].id

        await api.delete(`/api/blogs/${id}`).expect(204)
        
    })

    test("Deleting non existing blog with good if format", async () => {
        const id = await helper.nonExistingId()

        await api.delete(`/api/blogs/${id}`).expect(404)
        
    })

    test("Deleting invalid id", async () => {
        const id = 1234234

        await api.delete(`/api/blogs/${id}`).expect(400)
        
    })
})

describe("Updating blogs", () => {
    test("Updating existing blog", async () => {
        const blogs = await helper.blogsInDb()
        const id = blogs[0].id
        const blog = {
            title: "Manzanilla",
            author: "Bryan",
            url: "www.read.es",
            likes: 300
        }

        const updatedBlog = await api.put(`/api/blogs/${id}`).send(blog).expect(200)

        expect(updatedBlog.body.id).toBe(id)
        expect(updatedBlog.body.author).toBe(blog.author)
        
    })

    test("Updating non existing blog with good if format", async () => {
        const id = await helper.nonExistingId()
        const blog = {
            title: "Manzanilla",
            author: "Bryan",
            url: "www.read.es",
            likes: 300
        }

        const updatedBlog = await api.put(`/api/blogs/${id}`).send(blog).expect(200)

        expect(updatedBlog.body).toBeFalsy()
        
    })

    test("Updating invalid id", async () => {
        const id = 1234234
        const blog = {
            title: "Manzanilla",
            author: "Bryan",
            url: "www.read.es",
            likes: 300
        }

        await api.delete(`/api/blogs/${id}`).send(blog).expect(400)
        
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
