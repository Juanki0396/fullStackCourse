const Blog = require("../models/blog")
const User = require("../models/user")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const initialData = async () => {
    const users = [
        {
            userName: "Pepe",
            passwordHash: await bcrypt.hash("1234", 10),
            _id: new mongoose.Types.ObjectId() 
        },
        {
            userName: "Isa",
            passwordHash: await bcrypt.hash("piton", 10),
            _id: new mongoose.Types.ObjectId() 
        }
    ]

    const blogs =  [
        {
            title: "Hello World",
            author: "Benito",
            url: "www.torrent.com",
            likes: 5,
            user: users[0]._id,
            _id: new mongoose.Types.ObjectId() 
        },
        {
            title: "My mom is the best",
            author: "John Cena",
            url: "www.hatetestosterone.com",
            likes: 1000,
            user: users[0]._id,
            _id: new mongoose.Types.ObjectId() 
        }
    ]
    users[0].blogs = blogs.map(b => b._id)
    return {users, blogs}
}

const populateDB = async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    const {users, blogs} = await initialData()
    for (let user of users) {
        let userObject = User(user)
        await userObject.save()
    }
    for (let blog of blogs) {
        let blogObject = Blog(blog)
        await blogObject.save()
    }
}

const nonExistingId = async () => {
    const users = await usersInDb()
    const note = new Blog({ 
        title: "willremovethissoon" ,
        author: "author",
        url: "url",
        user: users[0].id
    })
    await note.save()
    await note.deleteOne()

    return note._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    populateDB, nonExistingId, blogsInDb, usersInDb
}
