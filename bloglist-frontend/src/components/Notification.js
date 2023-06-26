import { useEffect } from "react"

const Notification = ({ notificationState }) => {
    const { notification, setNotification } = notificationState

    const infoStyle = {
        color: "green",
        backgroundColor: "grey"
    }

    const errStyle = {
        color: "red",
        backgroundColor: "grey",
        borderStyle: "solid",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    }

    const defaultStyle = {
        color: "black"
    }

    useEffect( () => {
        if (notification) {
            setTimeout( () => {
                setNotification(null)
            }, 5000)
        }
    }, [notification, setNotification] )

    if (!notification || !notification.type || !notification.msg) {
        return null
    }

    const style = notification.type === 0
        ? infoStyle
        : notification.type === 1
            ? errStyle
            : defaultStyle

    return (
        <div style={style}>
            {notification.msg}
        </div>
    )

}

export default Notification
