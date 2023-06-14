const errorHandling = (err, _, res, next) => {
    console.log(err.message)
    if (err.name === "CastError") {
        return res.status(400).send({error: "Wrong Id format"})
    }
    next(err)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = { errorHandling, unknownEndpoint }
