import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'


const Notification =({message}) =>{
  if(message === null){
    return null
  }
return(
  <div className ='error'>
    {message}
  </div>
)
}


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setnewNumber] = useState("")
  const [namefilter, setnamefilter] = useState("")
  const [messagenotif, setmessagenotif] = useState(null)
  const names = persons.map(person => {
    return person.name.toLocaleLowerCase();
  });
//this code gets the data directly from the db.json and uses it and the data gets acted omn this itself
    //console.log('effect')
  useEffect(() => { 
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
  }, [])

  const Person = props =>{
    return(
      <div>
        {props.name} {props.number} {props.id}
        <button type="submit" onClick={()=>{console.log(props);handleDelete(props.id)}}>delete</button>
      </div>
    )
  }
  const filteredPersons = persons.filter(person => {
    return person.name.toLocaleLowerCase().includes(namefilter.toLowerCase());
  });

  const personsList = filteredPersons.map(person => {
      return (<Person key={person.name} name={person.name} number={person.number} id = {person.id}/>

      );
    });
    
  const handleChangeName = event => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = event =>{
    setnewNumber(event.target.value);
  }

  const handleChangeFilter = event =>{
    setnamefilter(event.target.value)
  }

  const createPerson = () =>{
    const replacer = (match, p1, p2) => {
      return p1.toUpperCase() + p2.toLocaleLowerCase();
    };

    const titleCasedName = newName.replace(/\b([a-zA-Z])(\w+)/g, replacer);

    const person = {
      name: titleCasedName,
      number: newNumber
    };
   return person;
  }

  /*const updatePerson = () =>{
    const person2 = persons.find(p => p.name === newName)
    const updatenum = window.confirm(`${person2.name} is already added to the phonebook. Do you want to replace the number?`);
    if(updatenum){
      const updatedPerson = { ...person2, number: newNumber };
      const id = person2.id;
      NoteService
      .updateAll(id, updatedPerson)
      .then(returnedPerson => {
      setPersons(persons.map(p => (p.id !== id ? p : returnedPerson)));
  }}
}*/

  const handleSubmit = (event,id) => {
    event.preventDefault();

    if (names.includes(newName.toLocaleLowerCase())) {
      alert(`${newName} is already added`)
    } 
    else {
      const person = createPerson();
      axios
        .post('http://localhost:3001/api/persons',person)
        .then(response => {
        setPersons(persons.concat(response.data))
        setmessagenotif(`${person.name} was added`)
        setNewName("");
        setnewNumber("")
        setTimeout(() =>{
          setmessagenotif(null)},5000)
        
      })
      .catch(error =>{
        setmessagenotif(`This person ${person} was not able to get added`)
        setTimeout(() =>{
          setmessagenotif(null)},5000)
          setPersons(persons.filter(p => p.id!==id))
      })

      //setNewName("");
      //setnewNumber("")
  }
}
 
const removeId = (id) =>{
          axios
             .delete(`http://localhost:3001/api/persons/${id}`)
             .then(response =>{
             setPersons(persons.filter(response => response.id !== id)) 
             })
             .catch(error =>{
               console.log('The person could not be deleted tbh')
             })
             
             
}

const handleDelete = (id) =>{
  
  const person1 = persons.filter(p => p.id === id);
  console.log(persons)
  console.log(id)
  const per = person1[0].id
  console.log(person1[0].name)
  console.log(person1[0].id)
  const deleteit = window.confirm(`Are you sure you want to delete ${person1[0].name}?`)
      if (deleteit)
        removeId(per)
        console.log(`${person1[0].name} successfully deleted`)
}


  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={messagenotif} />
      <form onSubmit={event => handleSubmit(event)}>
        <div>
          filter:{" "}
          <input onChange={event =>handleChangeFilter(event)} value={namefilter} />
        </div>
        <h1>Add a new </h1>
        <div>
          name:{" "}
          <input onChange={event => handleChangeName(event)} value={newName} />
        </div>
        <div>
          number:{" "}
          <input onChange={event => handleChangeNumber(event)} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsList}
    </div>
  );
};


export default App



/*{
  "name": "react-test-app-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "axios": "^0.21.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "web-vitals": "^1.1.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "json-server -p3001 --watch db.json"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "json-server": "^0.16.3"
  }
}
*/