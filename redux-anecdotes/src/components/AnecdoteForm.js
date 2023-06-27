import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = (ev) => {
        ev.preventDefault()
        const anecdote = ev.target.anecdote.value
        ev.target.anecdote.value = ""
        dispatch(addAnecdote(anecdote))
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
