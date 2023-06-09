const Form = ({onSubmit, onChangeName, name, onChangeNum, num}) => (
    <>
        <h3>Add a new number</h3>
        <form onSubmit={onSubmit}>
            <div>
                Name: <input onChange={onChangeName} value={name} />
            </div>
            <div>
                Number: <input onChange={onChangeNum} value={num} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    </>
)

export default Form;
