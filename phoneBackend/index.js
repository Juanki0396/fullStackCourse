require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const Phone = require("./phone")
const error = require("./error")

const app = express()
morgan.token("body", (req,) => JSON.stringify(req.body))

app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))
app.use(express.static("build"))

app.get("/api/persons", (_, res) => {
	Phone
		.find({})
		.then(phones => {
			res.json(phones)
		})
})

app.post("/api/persons", (req, res, next) => {
	const body = req.body
    
	const phone = Phone({
		name: body.name,
		number: body.number
	})

	Phone
		.find({name: phone.name})
		.then(phones => {
			if(phones.length > 0){
				res.status(400).json({error: `${phone.name} already exists`})
				return null
			}
			phone
				.save()
				.then(p => {
					res.json(p)
				})
				.catch(err => next(err))
		})
})

app.get("/api/persons/:id", (req, res, next) => {
	Phone
		.findById(req.params.id)
		.then(phone => {
			if (phone === null) {
				res.status(404).end()
			}
			else {
				res.json(phone)
			}
		})
		.catch( err => next(err) )

})

app.delete("/api/persons/:id", (req, res, next) => {
	Phone
		.findByIdAndRemove(req.params.id)
		.then( c => {
			if ( c.deleteCount === 0) {
				res.status(404).end()
			}
			else {
				res.status(204).end()
			}
		})
		.catch( err => next(err) )
})

app.put("/api/persons/:id", (req, res, next) => {
	const { name, number } = req.body

	Phone
		.findByIdAndUpdate(
			req.params.id,
			{ name, number },
			{ new: true, runValidators: true, context: "query" }
		)
		.then( updatedPhone => res.json(updatedPhone) )
		.catch( err => next(err) )
})

app.get("/info", (_, res) => {
	Phone
		.find({})
		.then(phones => {
			const body = `
                <p>The Phonebook has info for ${phones.length} people</p>
                <p>${Date().toLocaleString()}</p>
                `
			res.send(body)
		})
})

app.use(error.unknownEndpoint)
app.use(error.errorHandling)

const PORT = process.env.PORT
if (!PORT) {
	console.log("PORT is not defined")
}

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}`)
})
