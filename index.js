const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/personDb')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan('tiny'))



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  Person.find({}).then(person => {response.send(`
  <p>Phonebook has info for ${person.length} people</p>
  <p>${Date()}</p>
  `)
})})

app.get('/api/persons/', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  })

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.delete('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    person.deleteOne()
  }).then(response.status(204).end())
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
          error: 'name missing'
    })}
    else if (!body.number) {
    return response.status(400).json({
          error: 'number missing'
    })}

  const person = new Person ({
    content: body.content,
    name: body.name || false,
    number: body.number || false
  })

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})