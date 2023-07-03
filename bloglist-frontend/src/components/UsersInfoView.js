import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import usersService from "../services/users"

const UsersInfoView = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        usersService
            .getAllUsers()
            .then(data => setUsers(data))
    }, [])

    return (
        <>
            <h3>Users</h3>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th><b>Blogs created</b></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => {
                        return (
                            <tr key={u.id}>
                                <td key={u.userName}>
                                    <Link to={`/users/${u.userName}`}>{u.userName}</Link>
                                </td>
                                <td>{u.blogs.length}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default UsersInfoView
