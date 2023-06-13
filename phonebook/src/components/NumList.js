import Record from "./Record";

const NumList = ({persons, setPersons, filter, setError, setNoti}) => {
    return (
        <>
        <h3>Numbers</h3>
        {persons
            .filter( p => p.name.includes(filter))
            .map( p => <Record 
                key={p.name} 
                record={p}
                setPersons={setPersons}
                setError={setError}
                setNoti={setNoti}
                />
            )
        }
    </>
    )
}

export default NumList;
