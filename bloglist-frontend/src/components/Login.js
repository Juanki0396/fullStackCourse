import { createError } from "../reducers/notification"
import { useDispatch } from "react-redux"
import { useField } from "../hooks"
import { loginUser } from "../reducers/user"

const Login = () => {
    const [userName, resetUserName] = useField("userName", "text")
    const [password, resetPassword] = useField("passworda", "password")
    const dispatch = useDispatch()

    const onLoginPost = async (ev) => {
        ev.preventDefault()
        try {
            dispatch(loginUser(userName.value, password.value))
            resetUserName()
            resetPassword()
        } catch (ex) {
            console.log(ex)
            dispatch(createError("Wrong Credentials", 3))
        }
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
