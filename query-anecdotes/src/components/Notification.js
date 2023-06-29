import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () => {
    const [value, dispatch] = useContext(NotificationContext)

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    }

    if(!value) {
        return null
    }


    return (
        <div style={style}>
            {value}
        </div>
    )
}

export default Notification
