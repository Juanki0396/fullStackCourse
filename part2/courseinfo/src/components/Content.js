import Part from './Part'

const Content = ({ parts }) => parts.map( p => <Part key={p.name} part={p} /> )

export default Content;
