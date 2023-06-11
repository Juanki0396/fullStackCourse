import services from '../services/phones'

const Record = ({ record, setPersons}) => {
    const deletePhone = () => {
        const sure = window.confirm('Are you sure tou want to delete ' + record.name)
        if (sure) {
            services
                .deletePhone(record.id)
                .then( _ => {
                    services
                        .getAllPhones()
                        .then(res => setPersons(res))
                })
        }
    }
    return <div>{record.name}: {record.number} <button onClick={deletePhone}>Delete</button></div>
}

export default Record;
