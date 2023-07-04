import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Navbar = () => {
    const user = useSelector(state => state.user)

    //const linkStyle = {
    //    color: "black",
    //    width: 115,
    //    height: 25,
    //    padding: 10,
    //    textAlign: "center",
    //    borderRadius: 5,
    //    fontWeight: "bold",
    //    textDecoration: "none",
    //    borderRigth: "2 solid black",
    //}

    //const navStyle = {
    //    padding: 12,
    //    backgroundColor: "grey"
    //}

    return (
        <nav className="flex flex-row bg-slate-600 rounded h-10 p-1 justify-start content-center">
            <Link className="block flex-1 hover:bg-slate-700 text-center" to="/">Home</Link>
            <Link className="flex-1 hover:bg-slate-700 text-center" to="/blogs">Blogs</Link>
            <Link className="flex-1 hover:bg-slate-700 text-center" to="/users">Users</Link>
            { user
                ? <Link className="flex-1 hover:bg-slate-700 text-center" to="/logout">Log out</Link>
                : <Link className="basis-1/8 hover:bg-slate-700 text-center" to="/login">Log in</Link>
            }
        </nav>
    )
}

export default Navbar
