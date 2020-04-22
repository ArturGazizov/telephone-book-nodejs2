const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())


app.use(bodyParser.json())

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
  console.log(note)
  note.id=Math.round(Math.random()*100000)

if (!note.name)
	response.status(400).json({ error: 'name not specified' })
if (notes.find((arg)=>arg.name==note.name))
	response.status(400).json({ error: 'name must be unique' })
notes = notes.concat(note)
  response.json(note)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id )
  if ( note ) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})


app.get('/api/persons', (req, res) => {
  res.json(notes)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
