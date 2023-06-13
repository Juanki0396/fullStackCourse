import axios from "axios";

const url = "https://studies.cs.helsinki.fi/restcountries/api"

const getAllCountries = () =>{
    return axios
        .get(`${url}/all`)
        .then(res => res.data)
}

const module = { getAllCountries } 
export default module;
