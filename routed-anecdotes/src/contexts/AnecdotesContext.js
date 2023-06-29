import { createContext, useContext, useReducer } from "react";

const anecdotesReducer = (state, { type, payload }) => {
    console.log("Anecdotes Reducer:", type, payload)
    switch(type) {
        case "ADD":
            return state.concat({
                id: Math.round(Math.random() * 10000),
                ...payload
            })
        case "VOTE":
            console.log("Voting")
            return state
        default:
            return state
    }
}

const AnecdotesContext = createContext()

export const AnecdoteContextProvider = ({ children }) => {
    const [anecdotes, dispatch] = useReducer(
        anecdotesReducer, 
        [
            {
                content: 'If it hurts, do it more often',
                author: 'Jez Humble',
                info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
                votes: 0,
                id: 1
            },
            {
                content: 'Premature optimization is the root of all evil',
                author: 'Donald Knuth',
                info: 'http://wiki.c2.com/?PrematureOptimization',
                votes: 0,
                id: 2
            }
        ])

    return (
        <AnecdotesContext.Provider value={[anecdotes, dispatch]}>
            {children}
        </AnecdotesContext.Provider>
    )
}

export const useAnecdotesValue = () => {
    return useContext(AnecdotesContext)[0]
}

export const useAnecdotesDispatch = () => {
    return useContext(AnecdotesContext)[1]
}

export const addAnecdote = (content, dispatch) => {
    const action = {
        type: "ADD",
        payload: content
    }
    dispatch(action)
}

export default AnecdotesContext
