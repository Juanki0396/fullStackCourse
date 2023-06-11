import Record from "./Record";

const NumList = ({persons, setPersons, filter}) => {
    return (
        <>
        <h3>Numbers</h3>
        {persons
            .filter( p => p.name.includes(filter))
            .map( p => <Record 
                key={p.name} 
                record={p}
                setPersons={setPersons}
                />
            )
        }
    </>
    )
}

export default NumList;
