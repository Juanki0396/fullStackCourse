const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const config = require("./utils/config")
const blogRouter = require("./controllers/blogs")
const logger = require("./utils/logger")
const middlware = require("./utils/middleware")


const app = express()

logger.info("Connecting to MongoDB...")

mongoose
    .connect(config.MONGO_URI)
    .then(() => {
        logger.info("Connected to MongoDB")
    })
    .catch(() => {
        logger.error("Failed to connect to MongoDB")
    })


app.use(cors())
app.use(express.json())
app.use(middlware.requestLogger)
app.use("/api/blogs", blogRouter)
app.use(middlware.unknownEndpoint)
app.use(middlware.errorHandler)

module.exports = app
