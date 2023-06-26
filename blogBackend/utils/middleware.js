const jwt = require("jsonwebtoken")
const config = require("./config")
const User = require("../models/user")
const logger = require("./logger")

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method)
    logger.info("Path:  ", request.path)
    logger.info("Authorization:  ", request.get("authorization"))
    logger.info("Body:  ", request.body)
    logger.info("---")
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: error.message })
    } else if (error.name === "TokenExpiredError") {
        return response.status(401).json({ error: error.message })
    }

    next(error)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get("authorization")
    if (authorization && authorization.startsWith("Bearer ")) {
        req.token = authorization.replace("Bearer ", "")
    }
    else {
        req.token = null
    }
    next()
}

const userExtractor = async (req, res, next) => {
    const token = req.token
    if (token) {
        try {
            const verifyJwt = jwt.verify(token, config.SECRET)
            if (!verifyJwt.id) {
                return res.status(401).send({error: "invalid token"})
            }
            req.user = await User.findById(verifyJwt.id)
            if (!req.user) {
                return res.status(401).send({error: "invalid token"})
            }
        }
        catch(ex) {
            next(ex)
        }
    }
    else {
        return res.status(401).send({ error: "Not logged" })
    }
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
}

