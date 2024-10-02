import React from 'react';
import './css/labeledInput.css'
import '../css/base.css'

const LabeledInput = ({ labelText, inputType, inputName, required }) => {
    const inputId = `labeledInput-button-${inputName}`;
    let forgotPassword;
    if (inputType == "password") {
        forgotPassword = (
            <p className='forgotPassword' id='forgotPassword'></p>
        )
    }
    return (
        <div className='labeledInput' id='labeledInput'>
            <label className='labeledInput-label' htmlFor={inputId}>{labelText}</label>

            <input className='labeledInput-input' id={inputId} required={required} type={inputType} placeholder={labelText} />
        </div>
    )
}

export default LabeledInput;