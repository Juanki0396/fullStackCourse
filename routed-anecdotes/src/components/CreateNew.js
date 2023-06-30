import { useNavigate } from "react-router-dom"
import { addAnecdote, useAnecdotesDispatch } from "../contexts/AnecdotesContext"
import { makeNotification, useNotificationDispatch } from "../contexts/NotificationContext"
import { useField } from "../hooks"

const CreateNew = () => {
    const [content, resetContent]  = useField("text")
    const [author, resetAuthor] = useField("text")
    const [info, resetInfo] = useField("text")
    const anecdotesDispatch = useAnecdotesDispatch()
    const notificationDispatch = useNotificationDispatch()
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
        addAnecdote(
            {
                content: content.value,
                author: author.value,
                info: info.value,
                votes: 0
            },
            anecdotesDispatch
        )
        makeNotification(
            `Created new anecdote ${content.value}`,
            3,
            notificationDispatch
        )
        navigate("/")
    }

    const resetInputs = (e) =>{
        e.preventDefault()
        resetContent()
        resetInfo()
        resetAuthor()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    url for more info
                    <input {...info} />
                </div>
                    <button type="submit">create</button>
                    <button onClick={resetInputs}>reset</button>
            </form>
        </div>
    )

}

export default CreateNew
