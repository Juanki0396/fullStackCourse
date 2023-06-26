import { useState, useImperativeHandle, forwardRef } from "react"
import PropTypes from "prop-types"

const Togglable = forwardRef(({ children, buttonText }, refs) => {
    const [toggled, setToggled] = useState(false)

    const toggle = () => {
        setToggled(!toggled)
    }

    const hideOnToggled = {
        display: toggled ? "none" : ""
    }

    const showOnToggled = {
        display: !toggled ? "none" : ""
    }

    useImperativeHandle(refs, () => {
        return {
            toggled,
            setToggled
        }
    })

    return (
        <>
            <button style={hideOnToggled} onClick={toggle}>{buttonText}</button>
            <div style={showOnToggled}>
                {children}
            </div>
            <button style={showOnToggled} onClick={toggle}>Cancel</button>
        </>
    )
})

Togglable.propTypes = {
    buttonText: PropTypes.string.isRequired
}

Togglable.displayName = "Togglable"

export default Togglable
