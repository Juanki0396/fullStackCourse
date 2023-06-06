import { useState } from 'react'

const SectionTitle = ({ name }) => {
    return <h1>{name}</h1>
}

const Button = ({ text, onClickHandle }) => {
    return <button onClick={onClickHandle}>{text}</button>
}

const StatLine = ({ name, num, unit=''}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{num}{unit}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const all = (good + neutral + bad)
    const avg = (good - bad) / all
    const pos = good / all * 100

    return (
        <table>
            <StatLine name={'Good'} num={good} />
            <StatLine name={'Neutral'} num={neutral} />
            <StatLine name={'Bad'} num={bad} />
            <StatLine name={'All'} num={all} />
            <StatLine name={'Average'} num={avg} />
            <StatLine name={'Positive'} num={pos} unit={'%'} />
        </table>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const createHandle = (stateSetter, state) => {
        return () => {
            stateSetter(state + 1)
        }
    }

    return (
        <>
        <SectionTitle name={'Give Feedback'} />
        <Button text={'Good'} onClickHandle={createHandle(setGood, good)} />
        <Button text={'Neutral'} onClickHandle={createHandle(setNeutral, neutral)} />
        <Button text={'Bad'} onClickHandle={createHandle(setBad, bad)} />
        <SectionTitle name={'Statistics'} />
        <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    )
}

export default App
