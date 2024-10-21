import React from 'react';
import './css/labeledInput.css'
import '../css/base.css'

const LabeledInput = ({ labelText, inputType, inputName, required, rows, selectOptions, selectCallback }) => {
    const inputId = `labeledInput-button-${inputName}`;
    let forgotPassword;
    if (inputType === "password") {
        forgotPassword = (
            <p className='forgotPassword' id='forgotPassword' onClick={forgot}>Forgot?</p>
        )
    }
    function forgot() {
        window.location.pathname = "/forgot"
    }
    let newInput;
    if (inputType === 'textarea') {
        newInput = (<textarea className='labeledInput-input-textarea' rows={rows} id={inputId} required={required} type={inputType} placeholder={labelText} name={inputName} />);
    } else if (inputType === 'select') {
        newInput = (<select className='labeledInput-input-select' id={inputId} required={required} name={inputName} onChange={selectCallback}>
            {selectOptions}
        </select>);
    } else if (inputType === 'file') {
        newInput = (<input className='labeledInput-input' id={inputId} required={required} type={inputType} placeholder={labelText} name={inputName} />);
    } else {
        newInput = (<input className='labeledInput-input' id={inputId} required={required} type={inputType} placeholder={labelText} name={inputName} />);
    }
    return (
        <div className='labeledInput' id='labeledInput'>
            <div className='labeledInput-label-container'>
                <label className='labeledInput-label' htmlFor={inputId}>{labelText}</label>
                {forgotPassword}
            </div>
            {newInput}
        </div>
    )
}

export default LabeledInput;