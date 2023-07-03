import { useState } from "react"
import loginService from "../services/login"

const Login = ({ setUser, setNotification }) => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const onInputChangeGen = (setter) => {
        return ({ target }) => {
            setter(target.value)
        }
    }

    const onLoginPost = async (ev) => {
        ev.preventDefault()
        try {
            const userData = await loginService.login({
                userName,
                password,
            })
            window.localStorage.setItem("blogAppUser", JSON.stringify(userData))
            setUser(userData)
            setUserName("")
            setPassword("")
        } catch (ex) {
            setNotification({
                msg: "Wrong Credentials",
                type: 1,
            })
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onLoginPost}>
                <div>
                    Username
                    <input
                        name="Username"
                        type="text"
                        value={userName}
                        onChange={onInputChangeGen(setUserName)}
                    />
                </div>
                <div>
                    Password
                    <input
                        name="Password"
                        type="password"
                        value={password}
                        onChange={onInputChangeGen(setPassword)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login
