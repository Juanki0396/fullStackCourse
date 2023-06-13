import BasicData from "./BasicData"
import Flag from "./Flag"
import Languages from "./Languages"

const CountryInfo = ({countries}) => {
    if (countries === null || countries.length !== 1) {
        return null
    }

    const c = countries[0]
    return (
        <div className="CountryInfo">
            <h2>{c.name.common}</h2>
            <BasicData c={c} />
            <Languages langs={c.languages} />
            <Flag img={c.flags.png} name={c.name.common} />
        </div>
    )
}

export default CountryInfo;
