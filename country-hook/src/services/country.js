import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"

const getAll = async () => {
    try {
        const res = await axios.get(`${baseUrl}/all`)
        return res.data
    } 
    catch(e) {
        return null
    }
}

const getCountry = async (name) => {
    try {
        const res = await axios.get(`${baseUrl}/name/${name}`)
        return res.data
    } 
    catch(e) {
        return null
    }
}

export default { getAll, getCountry }
