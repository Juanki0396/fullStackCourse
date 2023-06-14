const errorHandling = (err, _, res, next) => {
    console.log(err.message)
    if (err.name === "CastError") {
        return res.status(400).send({error: "Wrong Id format"})
    }
    else if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message })
    }
    next(err)
}

const unknownEndpoint = (_, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = { errorHandling, unknownEndpoint }
