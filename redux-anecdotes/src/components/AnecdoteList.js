import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { spawnNotification } from "../reducers/notificationReducer"
import AnecdoteFilter from "./AnecdoteFilter"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(spawnNotification(`You voted: '${anecdote.content}'`, 2))
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
            <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </>
    )
}

export default AnecdoteList
