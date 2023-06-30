import { useState, useEffect } from "react";
import countryService from "../services/country"

const initialState = {
    found: false,
    name: null,
    capital: null,
    flag: null,
    population: null
}

export const useCountry = () => {
    const [countryData, setCountryData] = useState(initialState)
    const [search, setSearch] = useState("")

    useEffect(() => {
        const getCountryFromApi = async () => {
            const res = await countryService.getCountry(search)
            if (!res) {
                setCountryData(initialState)
                return
            }
            const newData = {
                found: true,
                name: res.name.common,
                capital: res.capital,
                flag: res.flags.png,
                population: res.population
            }
            setCountryData(newData)
        }
        getCountryFromApi()
    }, [search])

    return [
        countryData,
        setSearch
    ]
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

