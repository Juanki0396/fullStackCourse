const SearchBar = ({search, onChange}) => {
    return (
        <div className="SearchBar">
            Search country: <input value={search} onChange={onChange}/>
        </div>
    )
}

export default SearchBar;
