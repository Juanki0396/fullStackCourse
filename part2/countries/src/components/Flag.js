const Flag = ({img, name}) => {
    return (
        <>
            <h3>Flag</h3>
            <img src={img} alt={`Flag of ${name}`}/>
        </>
    )
}

export default Flag;
