import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Navbar = () => {
    const user = useSelector(state => state.user)

    const linkStyle = {
        padding: 5
    }

    return (
        <nav>
            <Link style={linkStyle} to="/">Home</Link>
            <Link style={linkStyle} to="/users">Users</Link>
            { user
                ? <Link style={linkStyle} to="/logout">Log out</Link>
                : <Link style={linkStyle} to="/login">Log in</Link>
            }
        </nav>
    )
}

export default Navbar
