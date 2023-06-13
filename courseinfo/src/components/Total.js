const Total = ({ parts }) => {
    const sum = parts.reduce((acc, p) => p.exercises + acc, 0)
    return <p><b>Number of exercises {sum}</b></p>
}
export default Total;
