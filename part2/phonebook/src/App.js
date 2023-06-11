import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Form from './components/Form'
import NumList from './components/NumList'
import services from './services/phones'


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
        const name = newName.trim()
        if(name === '') {
            alert('Please, fill the name')
        }
        else if(newNum === '') {
            alert('Please, fill the number')
        }
        else if(persons.filter( p => p.name === name ).length !== 0){
            const confirm = window.confirm(`Do you want to replace ${name} number?`)
            if(confirm) {
                const newRecord = createRecord(name, newNum)
                const id = persons
                    .filter( p => p.name === name )[0]
                    .id
                services
                    .updatePhone(id, newRecord)
                    .then( _ => {
                        services
                            .getAllPhones()
                            .then( res => {
                                setPersons(res)
                                setNewName('')
                                setNewNum('')
                            })
                    })

            }
        }
        else {
            const newRecord =  createRecord(name, newNum)
            services
                .createPhone(newRecord)
                .then(res => {
                    setPersons(persons.concat(res))
                    setNewName('')
                    setNewNum('')
                })
        }
    }

    const createOnChange = setter => {
        return ev => setter(ev.target.value)
    }

    useEffect(() => {
        services
            .getAllPhones()
            .then(res => setPersons(res))
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
            <NumList persons={persons} setPersons={setPersons} filter={filter} />
        </div>
    )
}

export default App
