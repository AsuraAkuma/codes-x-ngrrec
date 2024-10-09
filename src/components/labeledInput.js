import React from 'react';
import './css/labeledInput.css'
import '../css/base.css'

const LabeledInput = ({ labelText, inputType, inputName, required }) => {
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
    return (
        <div className='labeledInput' id='labeledInput'>
            <div className='labeledInput-label-container'>
                <label className='labeledInput-label' htmlFor={inputId}>{labelText}</label>
                {forgotPassword}
            </div>
            <input className='labeledInput-input' id={inputId} required={required} type={inputType} placeholder={labelText} name={inputName} />
        </div>
    )
}

export default LabeledInput;