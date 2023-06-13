const express = require("express")
const morgan = require("morgan")
const app = express()

app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let notes = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (_, res) => {
    res.json(notes)
})

app.post('/api/persons', (req, res) => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(p => p.id))
        : 0

    const note = req.body
    
    if (!note.name) {
        res.status(400).json({error: "name field is not setted"})
        return null
    }
    else if (!note.number) {
        res.status(400).json({error: "number field is not setted"})
        return null
    }
    else if (notes.find(p => p.name === note.name)) {
        res.status(400).json({error: `${note.name} already exists`})
        return null
    }

    const newNote = {
        id: maxId + 1,
        name: note.name,
        number: note.number
    }
    
    notes = notes.concat(newNote)
    res.json(newNote)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = notes.find(p => p.id === id)
    if (person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const oldLen = notes.length.valueOf()
    notes = notes.filter(p => p.id !== id)
    
    if (oldLen !== notes.length) {
        res.status(204).end()
    }
    else {
        res.status(404).end()
    }
})

app.get('/info', (_, res) => {
    const body = `
        <p>The Phonebook has info for ${notes.length} people</p>
        <p>${Date().toLocaleString()}</p>
    `
    res.send(body)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT

if (!PORT) {
    console.log("PORT is not defined")
}

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})
