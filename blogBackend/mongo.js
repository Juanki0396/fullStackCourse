const Blog = require("./models/blog")
const logger = require("./utils/logger")
const config = require("./utils/config")
const mongoose = require("mongoose")

const title = process.argv[2]
const author = process.argv[3]
const url = process.argv[4]
const likes = Number(process.argv[5])

logger.info("Connecting to MongoDB...")

mongoose
    .connect(config.MONGO_URI)
    .then(() => {
        logger.info("Connected to MongoDB")
    })
    .catch(() => {
        logger.error("Failed to connect to MongoDB")
    })


if (!title || !author || !url || !likes) {
    Blog
        .find({})
        .then(res => {
            console.log("Blog:")
            res.forEach(p => console.log(`${p.title} - ${p.author}: url=${p.url} likes=${p.likes}`))
            process.exit(0)
        })
        .catch(() => {
            console.log("Cannot retreive data from DB")
            process.exit(1)
        })

}
else {
    const phone = Blog({
        title,
        author,
        url,
        likes
    })
    phone
        .save()
        .then(res => {
            console.log(`Added to DB -> ${res.title} - ${res.author}: url=${res.url} likes=${res.likes}`)
            process.exit(0)
        })
        .catch(() => {
            console.log(`Cannot add ${title} to DB`)
            process.exit(1)
        })
}

    
