


if (process.argv.length < 3 || (process.argv.length > 3 && process.argv.length < 5)) {
  console.log('Please provide the password as an argument: node mongo.js <password> <person name> <person number>')
  process.exit(1)
}

const password = process.argv[2]
const pername = process.argv[3]
const pernumber = process.argv[4]
const mongoose = require('mongoose')

const url =
  `mongodb+srv://my-phonebook:${password}@cluster0.ziqsk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
  id: Number,
})

const person_l = 0

const Person = mongoose.model('Person', personSchema)
// const getId = () =>{
//     Person.find({}).then(result =>{
//         result.forEach(person =>{
//             person_l++
//         })
//     })
//     return person_l
// }
const person = new Person({
  name : pername,
  number : pernumber,
//   id: getId(),
})

if(process.argv.length === 3){
    console.log('phonebook')
    Person.find({}).then(result =>{
    result.forEach(person =>{
        console.log(person)
    })
    mongoose.connection.close()
})
}

if(process.argv.length === 5){
    person.save().then(result => {
    console.log(`Person ${person.name} ${person.number} is saved`)
    mongoose.connection.close()
    })
}