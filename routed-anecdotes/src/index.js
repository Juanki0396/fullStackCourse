import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AnecdoteContextProvider } from './contexts/AnecdotesContext'
import { BrowserRouter } from 'react-router-dom'
import { NotificationContextProvider } from './contexts/NotificationContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>  
        <NotificationContextProvider>
        <AnecdoteContextProvider>
        <BrowserRouter>
                <App />
        </BrowserRouter>
        </AnecdoteContextProvider>
        </NotificationContextProvider>
    </StrictMode>
)
