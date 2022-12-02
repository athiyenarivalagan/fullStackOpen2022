import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import {ErrorNotification, SuccessNotification} from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = event => {
    event.preventDefault() // no form submission
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    // check if name already exists in persons
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (
        window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)) {
        const personId = existingPerson.id
        const updatedNumber = { ...existingPerson, number: newNumber }
        personService
        .update(personId, updatedNumber)
        .then(returnedPerson => {
          setPersons(
            persons.map(person =>
               person.id !== personId ? person : returnedPerson))
          setSuccessMessage(
            `The number of ${newName} is updated`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${newName} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.name !== newName))
        }) 
      }
    }
      else {
     (personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(
          `${newName} is added to the phonebook`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Couldn't add the contact of ${newName}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      )
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setFilterName(event.target.value)
  
  // filter logic
  const filterByNames =
   filterName === '' ?
    persons : 
    persons.filter(person =>
       (person.name).toLowerCase().includes(filterName.toLowerCase()))
   
  const deletePerson = (id, name) => {
    const updatedPersons = persons.filter(person => person.id !== id)
    if (window.confirm(`Delete ${name} ?`)) {
      personService
      .remove(id)
      .then(response => {
        setPersons(updatedPersons)
        setSuccessMessage(
          `the contact ${name} was successfully removed from server`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `The contact ${name} has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      setPersons(updatedPersons)
    }
  } 


  return (
    <>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <Filter 
      filterName={filterName}
      handleFilterChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm 
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
       filteredNames={filterByNames}
       deletePerson={deletePerson}
      />
    </>
  )
}

export default App