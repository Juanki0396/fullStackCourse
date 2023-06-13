const Languages = ({langs}) => {
    const langsArr = []
    Object.keys(langs).forEach(k => {
        langsArr.push(langs[k])
    })

    return (
        <>
            <h3>Languages</h3>
            <ul key={Languages}>
                {langsArr.map(l => <li key={l}>{l}</li>)}
            </ul>
        </>
    )
}

export default Languages;
