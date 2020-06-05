import React from 'react';
import Numerot from './components/Numerot'
import Forms from './components/Forms'
import axios from 'axios'

import personService from './services/persons'

/*
"_comment": "axios.get('http://localhost:3001/person')  
npm install json-server --save 
\"server\": \"json-server -p3001 db.json\" 
npm run server",
*/

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: '',
      newNumber: ''
    }

this.addName = this.addName.bind(this)
this.handleNumberChange = this.handleNumberChange.bind(this)
this.handleNameChange = this.handleNameChange.bind(this)
this.removeName = this.removeName.bind(this)

//this.toggleImportanceOf=this.toggleImportanceOf.bind(this)

 
  }

/*
toggleImportanceOf = (id) => {
  return () => {
    console.log('importance of '+id+' needs to be toggled')
  }
}
*/

componentDidMount() {


  personService
    .getAll()
    .then(response => {
      console.log("response")
      console.log(response)
      this.setState({persons: response})
    })
}

removeName =(id)=>{
return ()=>{



personService.get(id).then
( response=>
  {if (window.confirm(`Poistetaanko ${response.data.name} ?`))

personService.remove(id).
then
(()=>
personService
    .getAll()
    .then(response => {
      this.setState({persons: response})
    })
)
}
)


}
}


  addName = (event) => {
  event.preventDefault()
  const nameObject = {
    name: this.state.newName,
    number: this.state.newNumber,
    //date: new Date().toISOString(),
    //important: Math.random() > 0.5,
    //id: this.state.notes.length + 1
  }
    if(this.state.persons.find(it=>it.name==this.state.newName))
      alert("already had added such name")
else
{


   //axios.post('http://localhost:3001/notes', nameObject)
   personService.create(nameObject)
    //.then(response => {
    //  console.log(response)
    //})
    .then(response => {
      this.setState({
        persons: this.state.persons.concat(response.data),
        newName: '',
        newNumber: '',
      })
    })


  }
}

handleNameChange = (event) => {
    //console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

handleNumberChange = (event) => {
    //console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }



  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>




        <Forms addName={this.addName} handleNameChange={this.handleNameChange}
        handleNumberChange={this.handleNumberChange} newName={this.state.newName} 
        newNumber={this.state.newNumber} />




        <Numerot persons={this.state.persons} functions={this.removeName}/>
      </div>
    )
  }
}

export default App
