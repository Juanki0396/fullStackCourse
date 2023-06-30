import { useState } from "react";

export const useField = (type) => {
    const [value, setter] = useState("")

    const onChange = (ev) => {
        setter(ev.target.value)
    }

    const resetField = () => {
        setter("")
    }

    return [
        {
            type, 
            value,
            onChange
        },
        resetField
    ]

}
