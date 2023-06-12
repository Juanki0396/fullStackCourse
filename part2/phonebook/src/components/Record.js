import services from '../services/phones'

const Record = ({ record, setPersons, setError, setNoti}) => {
    const deletePhone = () => {
        const sure = window.confirm('Are you sure tou want to delete ' + record.name)
        if (sure) {
            services
                .deletePhone(record.id)
                .then( _ => {
                    setNoti(`${record.name} has been deleted`)
                    services
                        .getAllPhones()
                        .then(res => setPersons(res))
                    setTimeout(() => setNoti(null), 5000)
                })
                .catch( _ => {
                    setError(`Cannot delete ${record.name}. It does not exist`)
                    setTimeout(() => setError(null), 5000)
                })
        }
    }
    return <div>{record.name}: {record.number} <button onClick={deletePhone}>Delete</button></div>
}

export default Record;
