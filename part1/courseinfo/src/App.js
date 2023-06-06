const Header = ({course}) => {
    return <h1>{course.name}</h1>
}

const Contents = ({course}) => {
    return course.parts.map( 
        (e) => <Part part={e.name} exercise={e.exercises} />
    )
}

const Part = ({part, exercise}) => <p>{part} {exercise}</p>

const Total = ({course}) => {
    const total = course.parts.reduce(
        (acc, obj) => {
            return obj.exercises + acc
        }
        , 0)
    return <p>Number of exercises {total}</p>
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts:  [
            { 
                name:'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
          <Header course={course}/>
          <Contents course={course}/>
          <Total course={course}/>
        </div>
    )
}

export default App
