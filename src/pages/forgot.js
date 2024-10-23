import React from "react";
import LabeledInput from "../components/labeledInput";
import '../css/forgot.css';
import '../css/base.css'

const ForgotPassword = () => {
    async function handleSubmit(event) {
        event.preventDefault();
        const targetElement = document.getElementById(event.target.id);
        if (targetElement.id === "forgot-form") {
            const formData = new FormData(targetElement);
            const req = await fetch(`http://localhost:5500/api/login/forgot`, {
                method: 'POST',
                mode: 'cors',
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify({
                    username: formData.get('username')
                })
            })
            const response = await req.json();
            if (response.success) {
                // window.location.pathname = "/team";

            }
        } else {
            const formData = new FormData(targetElement);
            const req = await fetch(`http://localhost:5500/api/login/code`, {
                method: 'POST',
                mode: 'cors',
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify({
                    code: formData.get('code')
                })
            })
            const response = await req.json();
            if (response.success) {
                // window.location.pathname = "/team";

            }
        }
    }

    return (
        <div className='body'>
            <div className='forgot'>
                <form className='forgot-form-username' id='forgot-form' onSubmit={handleSubmit}>
                    <h2 className='forgot-header'>Forgot password</h2>
                    <LabeledInput labelText={"Username"} inputName={"username"} inputType={"text"} required={true} />
                    <button className='forgot-form-button' type='submit'>Submit</button>
                </form>
                <form className='forgot-form-code' id='forgot-form-code' onSubmit={handleSubmit}>
                    <h2 className='forgot-header'>Forgot password</h2>
                    <LabeledInput labelText={"Code"} inputName={"code"} inputType={"text"} required={true} />
                    <button className='forgot-form-button' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
};
export default ForgotPassword;