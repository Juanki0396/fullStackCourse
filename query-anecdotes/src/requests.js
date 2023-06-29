import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const { data } = await axios.get(baseUrl)
    return data
}

const postAnecdote = async (anecdote) => {
    const { data } = await axios.post(baseUrl, anecdote)
    return data
}

const putAnecdote = async (anecdote) => {
    const { data } = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return data
}

export default { getAll, postAnecdote, putAnecdote}
