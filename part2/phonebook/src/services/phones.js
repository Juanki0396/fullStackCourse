import axios from "axios"

const basicUrl = "http://localhost:3001/persons"

const getAllPhones = () => {
    const request = axios.get(basicUrl)
    return request
        .then(res => res.data)
        .catch(err => alert("Cannot obtain phones from server"))
}

const createPhone = (phoneRecord) => {
    const request = axios.post(basicUrl, phoneRecord)
    return request
        .then(res => res.data)
        .catch(err => alert(`Cannot create record for ${phoneRecord.name}`))
}

const updatePhone = (id, phoneRecord) => {
    const request = axios.put(`${basicUrl}/${id}`, phoneRecord)
    return request
        .then(res => res.data)
        .catch(err => alert(`Cannot update record for ${phoneRecord.name}`))
}

const deletePhone = (id) => {
    const request =  axios.delete(`${basicUrl}/${id}`)
    return request
        .then()
        .catch(err => alert(`Fail to delete the record`))
}

const module = { getAllPhones, createPhone, updatePhone, deletePhone }

export default module
