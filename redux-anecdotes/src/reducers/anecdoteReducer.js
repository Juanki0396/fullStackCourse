import { createSlice } from "@reduxjs/toolkit"

import anecdoteService from "../services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const initialState = []

const anecdotesSlice = createSlice({
    name: "anecdotes",
    initialState,
    reducers:{
        addAnecdote(state, action) {
            const anecdote = asObject(action.payload)
            return state.concat(anecdote)
        },
        updateAnecdote(state, action) {
            const newValue = action.payload
            const idx = state.findIndex(a => a.id === newValue.id)
            state[idx] = newValue
        },
        pushAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { addAnecdote, updateAnecdote, pushAnecdote, setAnecdotes } = anecdotesSlice.actions

export const createNewAnecdote = (content) => {
    return async dispatch => {
        const anecdote = await anecdoteService.postOne({
            content,
            votes: 0
        })
        dispatch(pushAnecdote(anecdote))
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const voteAnecdote = (anecdote) => {
    return async dispatch => {
        const res = await anecdoteService.putAnecdote({
            ...anecdote,
            votes: anecdote.votes + 1
        })
        dispatch(updateAnecdote(res))
    }
}

export default anecdotesSlice.reducer
