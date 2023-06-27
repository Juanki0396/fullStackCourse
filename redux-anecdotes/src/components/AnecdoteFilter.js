import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const AnecdoteFilter = () => {
    const dispatch = useDispatch()
    
    const filterDispatch = ({ target }) => {
        dispatch(setFilter(target.value))
    }

    return (
        <div>
            Filter <input type="text" name="filter" 
                    onChange={filterDispatch} />
        </div>
    )

}

export default AnecdoteFilter
