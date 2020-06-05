const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const Teleph = require('./models/persons')
app.use(cors())

app.use(bodyParser.json())

const formatNote = (note) => {
  const formattedNote = { ...note._doc, id: note._id }
  delete formattedNote._id
  delete formattedNote.__v

  return formattedNote
}

app.use(express.static('build'))



let notes = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '151017-12-10'
  },
  {
    id: 2,
    name: 'Martti Tienari',
    number: '242011-12-10'
  },

  {
    id: 3,
    name: 'Arto Järvinen',
    number: '332017-11-10'
  },
  {
    id: 4,
    name: 'Letvo Kutvonen',
    number: '422017-12-11'
  }
]


app.post('/api/persons/', (request, response) => {




  const note = request.body
  //console.log(note)
  //note.id=Math.round(Math.random()*100000)//mongo itself generates ids

if (!note.name)
	response.status(400).json({ error: 'name not specified' })
if (notes.find((arg)=>arg.name==note.name))
	response.status(400).json({ error: 'name must be unique' })
notes = notes.concat(note)
  response.json(note)

const thenote = new Teleph({
    name: note.name,
    number: note.number
  })

  thenote
    .save()
    .then(savedNote => {
      response.json(formatNote(savedNote))
    })



})

app.delete('/api/persons/:id', (request, response) => {

Teleph.deleteMany({_id:request.params.id})

  //const id = Number(request.params.id)
  //notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})





app.get('/api/persons/:id', (request, response) => {
  //const id = Number(request.params.id)
  //const note = notes.find(note => note.id === id )
note=
  Teleph
    .find({_id:request.params.id})
    .then(notes => {
      return notes.map(formatNote)
    })
  if ( note ) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})



app.get('/api/persons', (request, response) => {
  Teleph
    .find({})
    .then(notes => {
      response.json(notes.map(formatNote))
    })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
