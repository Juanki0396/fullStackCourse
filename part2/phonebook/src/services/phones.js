import axios from "axios"

const basicUrl = "http://localhost:3001/persons"

const getAllPhones = () => {
    const request = axios.get(basicUrl)
    return request
        .then(res => res.data)
}

const createPhone = (phoneRecord) => {
    const request = axios.post(basicUrl, phoneRecord)
    return request
        .then(res => res.data)
}

const updatePhone = (id, phoneRecord) => {
    const request = axios.put(`${basicUrl}/${id}`, phoneRecord)
    return request
        .then(res => res.data)
}

const deletePhone = (id) => {
    const request =  axios.delete(`${basicUrl}/${id}`)
    return request
        .then()
}

const module = { getAllPhones, createPhone, updatePhone, deletePhone }

export default module
