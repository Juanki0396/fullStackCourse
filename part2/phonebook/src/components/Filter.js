const Filter = ({ onChange, filter }) => (
        <>
            <h3>Search numbers by name</h3>
            <form>
                <div>
                    Search <input onChange={onChange} value={filter} />
                </div>
            </form>
        </>
)

export default Filter;
