import { useSelector } from "react-redux"

const Notification = () => {
    const note = useSelector(state => state.notification)

    const infoStyle = {
        color: "green",
        backgroundColor: "grey",
        borderStyle: "solid",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
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

    if (!note || !note.type || !note.msg) {
        return null
    }

    const style = note.type === "INFO" ? infoStyle : errStyle

    return <div style={style}>{note.msg}</div>
}

export default Notification
