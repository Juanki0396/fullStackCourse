import { useState } from "react"

export const useField = (id, type) => {
    const [value, setValue] = useState("")

    const resetField = () => {
        setValue("")
    }

    const onChange = e => {
        setValue(e.target.value)
    }

    return [
        {
            id,
            value,
            type,
            onChange
        },
        resetField
    ]

}
