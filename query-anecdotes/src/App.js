import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import requests from './requests'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { spawnNotification, useNotiDispatch } from './NotificationContext'

const App = () => {
    const voteMutation = useMutation(requests.putAnecdote)
    const queryClient = useQueryClient()
    const notiDispatch = useNotiDispatch()

    const handleVote = (anecdote) => {
        const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
        voteMutation.mutate(
            votedAnecdote,
            {
                onSuccess: () => {
                    const data = [...queryClient.getQueryData("anecdotes")]
                    const idx = data.findIndex(a => a.id === anecdote.id)
                    data[idx].votes +=1
                    queryClient.setQueryData("anecdotes", data)
                    spawnNotification(
                        `Voted anecdote: ${data[idx].content}`,
                        notiDispatch
                    )
                }
            }
        )
    }

    const data = useQuery(
        "anecdotes",
        requests.getAll,
        {
            retry: 1
        }
    )

    if(data.isLoading) {
        return <div>Is Loading ...</div>
    }

    if(data.isError) {
        return <div>Anecdote service is unavailable</div>
    }

    const anecdotes = data.data

    return (
        <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default App
