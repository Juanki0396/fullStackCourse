const Blog = require("../models/blog")

const initialBlogs = [
    {
        title: "Hello World",
        author: "Benito",
        url: "www.torrent.com",
        likes: 5
    },
    {
        title: "My mom is the best",
        author: "John Cena",
        url: "www.hatetestosterone.com",
        likes: 1000
    }
]

const nonExistingId = async () => {
    const note = new Blog({ 
        title: "willremovethissoon" ,
        author: "author",
        url: "url"
    })
    await note.save()
    await note.deleteOne()

    return note._id.toString()
}

const blogsInDb = async () => {
    const notes = await Blog.find({})
    return notes.map(note => note.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}
