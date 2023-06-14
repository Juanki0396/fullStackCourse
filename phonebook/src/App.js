import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Form from './components/Form'
import NumList from './components/NumList'
import Error from './components/Error'
import Notification from './components/Notification'
import services from './services/phones'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [filter, setFilter] = useState('')
    const [errorMsg, setError] = useState(null)
    const [notification, setNotification] = useState(null)

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
            setError('Please, fill the name')
            setTimeout(() => setError(null), 5000)
        }
        else if(newNum === '') {
            setError('Please, fill the number')
            setTimeout(() => setError(null), 5000)
        }
        else if(persons.filter( p => p.name === name ).length !== 0){
            const confirm = window.confirm(`Do you want to replace ${name} number?`)
            if(confirm) {
                const newRecord = createRecord(name, newNum)
                const id = persons.filter( p => p.name === name )[0].id
                services
                    .updatePhone(id, newRecord)
                    .then( _ => {
                        setNotification(`Updated ${name}'s number to Phonebook`)
                        services
                            .getAllPhones()
                            .then( res => {
                                setPersons(res)
                                setNewName('')
                                setNewNum('')
                            })
                        setTimeout(() => setNotification(null), 5000)
                    })
                    .catch( err => {
                        setError(`Cannot add ${name} to the PhoneBook`)
                        setTimeout(() => setError(null), 5000)
                    })

            }
        }
        else {
            const newRecord =  createRecord(name, newNum)
            services
                .createPhone(newRecord)
                .then(res => {
                    setNotification(`Adding ${name} to Phonebook`)
                    setPersons(persons.concat(res))
                    setNewName('')
                    setNewNum('')
                    setTimeout(() => setNotification(null), 5000)
                })
                .catch( err => {
                    setError(err.response.data.error)
                    setTimeout(() => setError(null), 5000)
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
            .catch(_ => {
                setError("Cannot retrieve phones from server.")
                setTimeout(() => setError(null), 5000)
            })
    }, [])

    
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notification={notification} />
            <Error errorMsg={errorMsg} />
            <Filter onChange={createOnChange(setFilter)} filter={filter} />
            <Form 
                onSubmit={onSubmit}
                onChangeName={createOnChange(setNewName)}
                name={newName}
                onChangeNum={createOnChange(setNewNum)}
                num={newNum}
            />
            <NumList 
                persons={persons} 
                setPersons={setPersons} 
                filter={filter}
                setError={setError}
                setNoti={setNotification}
            />
        </div>
    )
}

export default App
