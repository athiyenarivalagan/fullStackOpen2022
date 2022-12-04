const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

let persons = [
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

// parse the JSON string => construct the JS obj described by the string
app.use(express.json())
// tiny format 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))
app.use(cors())

// add a POST body content to all request & display it using the :post token
morgan.token('post', function (req) {
   return JSON.stringify(req.body)  // convert to JSON format 
 })

app.get('/api/persons', (request, response) =>
 response.json(persons)
 )

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people <p>${Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id) 

  if (person) {
     response.json(person) // convert obj to json
  } else {
    response.statusMessage = "NOT FOUND"
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = (max) => {
  return newId = Math.floor(Math.random() * max)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'The name or number is missing'
    })
  }

  // check if name already exists
  const existingPerson = persons.find(person =>
    person.name === body.name
  )

  if (existingPerson) {
    return response.status(400).json({
      error: 'name must be unique'
    }) 
  }

  const person = {
    id: generateId(100),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person) 
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})




