import axios from "axios"
const baseUrl = "/api/users"

const getAllUsers = async () => {
    const { data } = await axios.get(baseUrl)
    return data
}

const getOneUser = async (userName) => {
    const { data } = await axios.get(`${baseUrl}/${userName}`)
    return data
}

export default { getAllUsers, getOneUser }
