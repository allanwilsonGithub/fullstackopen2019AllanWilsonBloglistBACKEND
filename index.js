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

TODO
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

TODO
app.get('/info', (req, res) => {
  const test = 1
  res.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${Date()}</p>
  `)
})

TODO
app.get('/api/persons/', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})


DONE
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

TODO
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

TODO : might work already. Test with Postman
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
    else if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
          error: 'name already exists'
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


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})