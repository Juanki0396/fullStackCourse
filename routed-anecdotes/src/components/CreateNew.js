import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addAnecdote, useAnecdotesDispatch } from "../contexts/AnecdotesContext"
import { makeNotification, useNotificationDispatch } from "../contexts/NotificationContext"

const CreateNew = () => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')
    const anecdotesDispatch = useAnecdotesDispatch()
    const notificationDispatch = useNotificationDispatch()
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
        addAnecdote(
            {
                content,
                author,
                info,
                votes: 0
            },
            anecdotesDispatch
        )
        makeNotification(
            `Created new anecdote ${content}`,
            3,
            notificationDispatch
        )
        navigate("/")

    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div>
                    author
                    <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    url for more info
                    <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
                </div>
                    <button>create</button>
            </form>
        </div>
    )

}

export default CreateNew
