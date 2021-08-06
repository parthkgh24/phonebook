//const http = require('http')
const express = require('express')
//const { response } = require('express')
const cors = require('cors')
const app = express()
//var morgan = require('morgan')

app.use(express.json())
app.use(cors())
// morgan.token("data", function(req, res) {
//     const body = req.body
//     return JSON.stringify(body)
// })
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
    
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "Tyt",
      "number": "43",
      "id": 5
    },
    {
      "name": "Vsds",
      "number": "534",
      "id": 6
    },
    {
      "name": "Hyyh",
      "number": "4653",
      "id": 7
    },
    {
      "name": "Wf",
      "number": "343",
      "id": 8
    },
    {
      "name": "Mas",
      "number": "465",
      "id": 9
    },
    {
      "name": "Dudewitherror1",
      "number": "76564",
      "id": 10
    },
    {
      "name": "Fe",
      "number": "42",
      "id": 11
    },
    {
      "name": "Dee",
      "number": "534533",
      "id": 12
    },
    {
      "name": "Drt",
      "number": "8655",
      "id": 13
    },
  ]

app.get('/', (request, response) => {
  response.end('Hello World!')
}) //his will take care of application made using get req to the application's /root

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })//no reason to use stringify cause the applic does it directly in response.json(persons)

  app.get('/api/persons/info', (request, response) =>{
      
      var today = new Date();
      const message = `<p>The phonebook has ${persons.length} entries</p>
       <p>date is ${today}</p>`
      response.send(message)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person =>person.id ===id)
    if(person){
    response.json(person)
    }
    else
    response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    else if(persons.find(n =>n.id === body.id)){
        return response.status(400).json({
            error: 'ID must be unique'
        })
    }

  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
   
    console.log(person)
    response.json(person)
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

  const PORT= process.env.PORT || 3001
  app.listen(PORT, () =>{
      console.log(`Server running on port ${PORT}`)
  })