const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

console.log(password , name, number)

const url =
  `mongodb+srv://fullstack:${password}@cluster0-6rmsl.mongodb.net/people?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number
})


const Person = mongoose.model('Person', phonebookSchema)

if ( process.argv.length<4 ) {
    Person.find({}).then(result => {
      result.forEach(person => {
      console.log(person)
    })
  mongoose.connection.close()
})
} else {
  const person = new Person({
  name: name,
  number: number
  })

  person.save().then(response => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}
