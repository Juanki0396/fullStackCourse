import { useDispatch } from "react-redux"
import { createNewAnecdote } from "../reducers/anecdoteReducer"
import { spawnNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = async (ev) => {
        ev.preventDefault()
        const anecdote = ev.target.anecdote.value
        ev.target.anecdote.value = ""
        dispatch(createNewAnecdote(anecdote))
        dispatch(spawnNotification("Added new anecdote: " + anecdote, 2))
    }

    return (
        <>
        <h2>create new</h2>
        <form onSubmit={ev => add(ev)}>
        <div><input name="anecdote" type="text"/></div>
        <button type='submit'>create</button>
        </form>
        </>
    )
}

export default AnecdoteForm
