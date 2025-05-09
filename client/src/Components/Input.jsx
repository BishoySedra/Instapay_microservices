/* eslint-disable react/prop-types */
function Input({id,label,...props}) {
    return <>
        <div className="form-field">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                {...props}
            />
        </div>

    </>
}
export default Input;