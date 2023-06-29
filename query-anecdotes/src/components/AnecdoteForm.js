import { useContext } from "react"
import { useMutation, useQueryClient } from "react-query"
import NotificationContext, { spawnNotification, useNotiDispatch } from "../NotificationContext"
import requests from "../requests"


const AnecdoteForm = () => {
    const notiDispatch = useNotiDispatch()
    const client = useQueryClient()
    const newAnecdoteMutation = useMutation(
        requests.postAnecdote,
        {
            onSuccess: (data) => {
                client.invalidateQueries("anecdotes")
                spawnNotification(
                    `Added new anecdote: ${data.content}`,
                    notiDispatch
                )
            },
            onError: () => {
                spawnNotification(
                    "Error: be sure the anecdote has at least 5 chars long",
                    notiDispatch
                )
            }
        }
    )

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        newAnecdoteMutation.mutate({
            content,
            votes: 0
        })
    }

    return (
        <div>
        <h3>create new</h3>
        <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm
