import React from 'react'
import { useCountry, useField } from './hooks'

const Country = ({ country }) => {
    if (!country) {
        return null
    }

    if (!country.found) {
        return (
            <div>
                not found...
            </div>
        )
    }

    return (
        <div>
            <h3>{country.name} </h3>
            <div>capital {country.capital} </div>
            <div>population {country.population}</div> 
            <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
        </div>
    )
}

const App = () => {
    const nameInput = useField('text')
    const [country, searchCountry]  = useCountry()

    const onSubmit = e => {
        e.preventDefault()
        searchCountry(nameInput.value)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input {...nameInput} />
                <button type='submit'>find</button>
            </form>

            <Country country={country} />
        </div>
    )
}

export default App
