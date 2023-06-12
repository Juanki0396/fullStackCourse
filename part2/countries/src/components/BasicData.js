const BasicData = ({c}) => {
    return (
        <> 
            <h3>Basic Data</h3>
            <table>
                <tbody>
                    <tr key={1}>
                        <td key={1.1}>Capital:</td>
                        <td key={1.2}>{c.capital[0]}</td>
                    </tr>
                    <tr key={2}>
                        <td key={2.1}>Surface:</td>
                        <td key={2.2}>{c.area} Km²</td>
                    </tr>
                    <tr key={3}>
                        <td key={3.1}>Population:</td>
                        <td key={3.2}>{c.population}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default BasicData;
