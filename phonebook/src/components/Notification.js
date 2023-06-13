const Notification = ({notification}) => {
    if (notification === null) {
        return
    }
    const style = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    return (
        <div style={style}>
            {notification}            
        </div>
    )
}

export default Notification;
