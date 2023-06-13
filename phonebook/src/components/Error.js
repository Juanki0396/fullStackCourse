const Error = ({errorMsg}) => {
    if (errorMsg === null) {
        return
    }
    const style = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    return (
        <div style={style}>
            {errorMsg}            
        </div>
    )
}

export default Error;
