import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Form from './components/Form'
import NumList from './components/NumList'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [filter, setFilter] = useState('')

    const createRecord = (name, num) => {
        return {
            name: name,
            number: num
        }
    }

    const onSubmit = ev => {
        ev.preventDefault()
        if(newName === '' || newNum === '') {
            alert('Please, fill name and number')
        }
        else if(persons.filter( p => p.name === newName ).length !== 0){
            alert(`${newName} is already in the phonebook`)
        }
        else {
            const newRecord =  createRecord(newName, newNum)
            setPersons(persons.concat(newRecord))
            setNewName('')
            setNewNum('')
        }
    }

    const createOnChange = setter => {
        return ev => setter(ev.target.value)
    }

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then( response => {
                setPersons(response.data)
            })
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onChange={createOnChange(setFilter)} filter={filter} />
            <Form 
                onSubmit={onSubmit}
                onChangeName={createOnChange(setNewName)}
                name={newName}
                onChangeNum={createOnChange(setNewNum)}
                num={newNum}
            />
            <NumList persons={persons} filter={filter} />
        </div>
    )
}

export default App
