import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const postOne = async (anecdote) => {
    for(let i=0; i<5; i++) {
        try{
            const res = await axios.post(baseUrl, anecdote)
            return res.data
        }
        catch(ex) {
            console.error(ex.response)
            console.log(`Error in try ${i+1} of 5`)
        }
    }
    return {}
}

const putAnecdote = async (anecdote) => {
    for(let i=0; i<5; i++) {
        try{
            const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
            return res.data
        }
        catch(ex) {
            console.error(ex.response)
            console.log(`Error in try ${i+1} of 5`)
        }
    }
    return {}
}

export default { getAll, postOne, putAnecdote }
