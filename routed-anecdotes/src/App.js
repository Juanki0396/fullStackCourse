import { Route, Routes } from 'react-router-dom'

import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'

const App = () => {

    //const anecdoteById = (id) =>
    //    anecdotes.find(a => a.id === id)

    //const vote = (id) => {
    //    const anecdote = anecdoteById(id)

    //    const voted = {
    //        ...anecdote,
    //        votes: anecdote.votes + 1
    //    }

    //    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    //}

    return (
        <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <Notification />
            <Routes>
                <Route path='/' element={<AnecdoteList />}/>
                <Route path='/new' element={<CreateNew />}/>
                <Route path='/about' element={<About />}/>
                <Route path='/anecdotes/:id' element={<Anecdote />}/>
            </Routes>
            <Footer />
        </div>
    )
}

export default App
