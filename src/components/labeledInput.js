import React from 'react';
import './css/labeledInput.css'
import '../css/base.css'

const LabeledInput = ({ labelText, inputType, inputName, required, rows, selectOptions, selectCallback }) => {
    const inputId = `labeledInput-input-${inputName}`;
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
        // Change textarea input size
        const changeSize = ({ target }) => {
            const mainDiv = document.getElementById('main')
            const lineHeight = (mainDiv.clientHeight * .01) + 20;
            const rows = parseInt((target.scrollHeight / lineHeight).toString().split(".")[0]);
            if (rows < 5) {
                target.style.height = 'min-content';
                target.style.height = (target.scrollHeight) + 'px';
            }
        }
        newInput = (<textarea className='labeledInput-input-textarea' rows={(rows) ? rows : 1} id={inputId} required={required} type={inputType} placeholder={labelText} name={inputName} onInput={changeSize} />);
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