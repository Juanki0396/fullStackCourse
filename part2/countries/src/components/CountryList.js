const CountryList = ({countries, onShow}) => {
    if(countries === null) {
        return null
    }

    if (countries.length === 0) {
        return <div className="CountryList">There is no matching country for that search.</div>
    }
    else if (countries.length === 1) {
        return null
    }
    else if (countries.length > 10) {
        return <div className="CountryList">Too many matches. Be more specific.</div>
    }

    return (
        <div className="CountryList">
            <ul>
                {countries.map( c => {
                    return (
                    <li key={c.name.common}>
                        {c.name.common} <button onClick={onShow(c.name.common)}>{"Show"} </button>
                    </li>
                    )})
                }
            </ul>
        </div>
    )
}

export default CountryList;
