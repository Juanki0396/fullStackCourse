const Login = ( {loginStates, onLoginPost}) => {
    
    const { userName, setUserName, password, setPassword } = loginStates

    const onInputChangeGen = (setter) => {
        return ({target}) => {
            setter(target.value)
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
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Login;
