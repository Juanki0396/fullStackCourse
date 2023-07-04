import { useDispatch, useSelector } from "react-redux"
import { useField } from "../hooks"
import { loginUser } from "../reducers/user"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Login = () => {
    const [userName, resetUserName] = useField("userName", "text")
    const [password, resetPassword] = useField("passworda", "password")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    useEffect(() => {
        if(user){
            navigate("/")
        }
    }, [user])

    const onLoginPost = async (ev) => {
        ev.preventDefault()
        dispatch(loginUser(userName.value, password.value))
        resetUserName()
        resetPassword()
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onLoginPost}>
                <div>
                    Username
                    <input {...userName} />
                </div>
                <div>
                    Password
                    <input {...password} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login
