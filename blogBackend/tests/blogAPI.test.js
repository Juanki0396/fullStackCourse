const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./helper.initialBlogs")
const jwt = require("jsonwebtoken")
const config = require("../utils/config")
const app = require("../app")
const api = supertest(app)

describe("Getting all blogs", () => {
    beforeAll(async () => await helper.populateDB())

    test("blogs are returned as json", async () => {
        const {body} = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
        expect(body).toHaveLength(2)
        expect(body[0]).toMatchObject({title:"Hello World"})
        expect(body[0].id).toBeDefined()
        expect(body[0]._id).toBeFalsy()
        expect(body[0].user.userName).toBeDefined()
    })
})

describe("Post blogs", () => {
    beforeAll(async () => await helper.populateDB())

    test("Post 1 blog", async () => {
        const users = await helper.usersInDb()
        const blogsBefore = await helper.blogsInDb()

        const blog = {
            title: "Canelones",
            author: "Joseba",
            url: "www.fritangada.com",
            likes: 333,
        }

        const token = jwt.sign(users[0], config.SECRET)

        const nNotesBefore = users[0].blogs.length
        const nBlogsBefore = blogsBefore.length
        
        const res = await api
            .post("/api/blogs")
            .set("authorization", `Bearer ${token}`)
            .send(blog)
            .expect(201)
        expect(res.body).toMatchObject(blog)
        expect(res.body.user).toBe(users[0].id)

        const blogsAfter = await helper.blogsInDb()
        const usersAfter = await helper.usersInDb()
        expect(blogsAfter).toHaveLength(nBlogsBefore + 1)
        expect(usersAfter[0].blogs).toHaveLength(nNotesBefore + 1)

    })

    test("likes is set to 0 if not setted while posting", async () => {
        const users = await helper.usersInDb()
        const blog = {
            title: "Mierda",
            author: "POP",
            url: "www.shit.com",
        }
        
        const token = jwt.sign(users[0], config.SECRET)
        const res = await api
            .post("/api/blogs")
            .set("authorization", `Bearer ${token}`)
            .send(blog)
            .expect(201)
        expect(res.body.likes).toBe(0)
    })

    test("title is required", async () => {
        const users = await helper.usersInDb()
        const blog = {
            author: "POP",
            url: "www.shit.com",
        }
        
        const token = jwt.sign(users[0], config.SECRET)
        await api
            .post("/api/blogs")
            .set("authorization", `Bearer ${token}`)
            .send(blog)
            .expect(400)
    })

    test("author is required", async () => {
        const users = await helper.usersInDb()
        const blog = {
            title: "POP",
            url: "www.shit.com",
        }
        
        const token = jwt.sign(users[0], config.SECRET)
        await api
            .post("/api/blogs")
            .set("authorization", `Bearer ${token}`)
            .send(blog)
            .expect(400)
    })

})

describe("Deleting blogs", () => {
    beforeAll(async () => await helper.populateDB())

    test("Deleting existing blog", async () => {
        const users = await helper.usersInDb()
        const blogs = await helper.blogsInDb()
        const token = jwt.sign(users[0], config.SECRET)
        const id = blogs[0].id

        await api
            .delete(`/api/blogs/${id}`)
            .set("authorization", `Bearer ${token}`)
            .expect(204)
        
    })

    test("Deleting existing blog with an invalid user", async () => {
        const users = await helper.usersInDb()
        const blogs = await helper.blogsInDb()
        const token = jwt.sign(users[1], config.SECRET)
        const id = blogs[0].id

        await api
            .delete(`/api/blogs/${id}`)
            .set("authorization", `Bearer ${token}`)
            .expect(401)
        
    })

    test("Deleting existing blog without token", async () => {
        const blogs = await helper.blogsInDb()
        const id = blogs[0].id

        await api
            .delete(`/api/blogs/${id}`)
            .expect(401)
        
    })

    test("Deleting non existing blog with good if format", async () => {
        const id = await helper.nonExistingId()
        const users = await helper.usersInDb()
        const token = jwt.sign(users[0], config.SECRET)

        await api
            .delete(`/api/blogs/${id}`)
            .set("authorization", `Bearer ${token}`)
            .expect(404)
        
    })

    test("Deleting invalid id", async () => {
        const id = 1234234
        const users = await helper.usersInDb()
        const token = jwt.sign(users[0], config.SECRET)

        await api
            .delete(`/api/blogs/${id}`)
            .set("authorization", `Bearer ${token}`)
            .expect(400)
        
    })
})

describe("Updating blogs", () => {
    beforeAll(async () => await helper.populateDB())

    test("Updating existing blog", async () => {
        const blogs = await helper.blogsInDb()
        const users = await helper.usersInDb()
        const token = jwt.sign(users[0], config.SECRET)
        const id = blogs[0].id
        const blog = {
            title: "Manzanilla",
            author: "Bryan",
            url: "www.read.es",
            likes: 300
        }

        const updatedBlog = await api
            .put(`/api/blogs/${id}`)
            .set("authorization", `Bearer ${token}`)
            .send(blog)
            .expect(200)

        expect(updatedBlog.body.id).toBe(id)
        expect(updatedBlog.body.author).toBe(blog.author)
        
    })

    test("Trying updating existing blog with invalid user", async () => {
        const blogs = await helper.blogsInDb()
        const users = await helper.usersInDb()
        const token = jwt.sign(users[1], config.SECRET)
        const id = blogs[0].id
        const blog = {
            title: "Manzanilla",
            author: "Bryan",
            url: "www.read.es",
            likes: 300
        }

        await api
            .put(`/api/blogs/${id}`)
            .set("authorization", `Bearer ${token}`)
            .send(blog)
            .expect(401)
        
    })

    test("Updating non existing blog with good if format", async () => {
        const id = await helper.nonExistingId()
        const users = await helper.usersInDb()
        const token = jwt.sign(users[0], config.SECRET)
        const blog = {
            title: "Manzanilla",
            author: "Bryan",
            url: "www.read.es",
            likes: 300
        }

        const updatedBlog = await api
            .put(`/api/blogs/${id}`)
            .set("authorization", `Bearer ${token}`)
            .send(blog)
            .expect(200)

        expect(updatedBlog.body).toBeFalsy()
        
    })

    test("Updating invalid id", async () => {
        const id = 1234234
        const users = await helper.usersInDb()
        const token = jwt.sign(users[0], config.SECRET)
        const blog = {
            title: "Manzanilla",
            author: "Bryan",
            url: "www.read.es",
            likes: 300
        }

        await api
            .put(`/api/blogs/${id}`)
            .set("authorization", `Bearer ${token}`)
            .send(blog)
            .expect(400)
        
    })
})

describe("User addition", () => {
    beforeAll(async () => await helper.populateDB())

    test("creation succeeds with a fresh username", async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            userName: "mluukkai",
            name: "Matti Luukkainen",
            password: "salainen",
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.userName)
        expect(usernames).toContain(newUser.userName)
    })

    test("Cannot create repeated user", async () => {
        const newUser = {
            userName: "Pepe",
            password: "salainen",
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)
    })
})

describe("Get User data", () => {
    beforeAll(async () => await helper.populateDB())

    test("Get all users", async () => {
        const blogs = await helper.blogsInDb()
        const users = await helper.usersInDb()

        const res = await api
            .get("/api/users")
            .expect(200)
            .expect("Content-Type", /application\/json/)

        expect(res.body).toHaveLength(users.length)
        expect(res.body[0].blogs).toHaveLength(blogs.length)
    })
})

describe("Login tests", () => {
    beforeAll(async () => await helper.populateDB())

    test("Login Pepe works", async () => {
        const users = await helper.usersInDb()
        
        const { body } = await api
            .post("/api/login")
            .send({
                userName: users[0].userName,
                password: "1234"
            })
            .expect(200)

        expect(body.userName).toBe(users[0].userName)
        expect(body.token).toBeDefined()
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
