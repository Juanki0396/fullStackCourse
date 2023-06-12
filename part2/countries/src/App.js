import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";
import CountryInfo from "./components/CountryInfo";
import services from './services/countries'

function App() {
    const [search, setSearch] = useState('')
    const [filteredCountries, setFiltered] = useState(null)
    const [countries, setCountries] = useState([])

    const onChange = t => {
        const text = t.target.value
        if (countries !== null) {

        }
        setSearch(text) 
        setFiltered(
            countries.filter(c => {
                return c.name.common.toLowerCase().includes(text.toLowerCase())
            })
        )
    }

    const onShow = (n) => {
        return () => {
            setSearch(n) 
            setFiltered(
                countries.filter(c => {
                    return c.name.common.toLowerCase().includes(n.toLowerCase())
                })
            )
        }
    }

    useEffect(() => {
        services
            .getAllCountries()
            .then( res => setCountries(res))
    },[])



    return (
        <div className="App">
            <SearchBar search={search} onChange={onChange} />
            <CountryList countries={filteredCountries} onShow={onShow}/>
            <CountryInfo countries={filteredCountries} />
        </div>
    );
}

export default App;
