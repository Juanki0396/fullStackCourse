import { Navigate, useParams } from "react-router-dom"
import { useAnecdotesValue } from "../contexts/AnecdotesContext"

const Anecdote = () => {
    const id = useParams().id
    const anecdotes = useAnecdotesValue()
    const anecdote = anecdotes.find(a => {
        return a.id === Number(id)
    })

    if (!anecdote) {
        return <Navigate replace to="/" />
    }
    console.log(anecdote)

    return (
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <p>has {anecdote.votes} votes.</p>
            <p>For more info see <a href={anecdote.info}>{anecdote.info}</a></p>
        </div>
    )
}

export default Anecdote
