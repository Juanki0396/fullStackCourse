import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { cleanNotification, setNotification } from "../reducers/notificationReducer"
import AnecdoteFilter from "./AnecdoteFilter"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`You voted: '${anecdotes.find(a => a.id === id).content}'`))
        setTimeout(() => {
            dispatch(cleanNotification())
        }, 5000)
    }

    return (
        <> 
        <h2>Anecdotes</h2>
        <AnecdoteFilter />
        <br/>
        {anecdotes
            .filter(a => a.content.includes(filter))
            .sort((a,b) => a.votes < b.votes)
            .map(anecdote =>
            <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
        </>
    )
}

export default AnecdoteList
