import React, { useState } from "react";
import LabeledInput from "../components/labeledInput";
import '../css/forgot.css';
import '../css/base.css'
import ErrorMessage from "../components/error";
import config from '../config.json';
const { apiURL } = config;

const ForgotPassword = () => {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        const targetElement = document.getElementById(event.target.id);
        const usernameForm = document.getElementById('forgot-form-username');
        const codeForm = document.getElementById('forgot-form-code');
        const passwordForm = document.getElementById('forgot-form-password');

        if (targetElement.id === "forgot-form-username") {
            const formData = new FormData(targetElement);
            const req = await fetch(`${apiURL}/api/login/forgot`, {
                method: 'POST',
                mode: 'cors',
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify({
                    username: formData.get('username')
                })
            })
            const response = await req.json();
            if (response.success === true) {
                sessionStorage.setItem('resetUsername', formData.get('username'));
                usernameForm.style.display = 'none';
                codeForm.style.display = 'flex';
                passwordForm.style.display = 'none';
            } else {
                setShowError(true);
                setErrorMessage(response.error);
                setTimeout(() => {
                    setShowError(false);
                    setErrorMessage("");
                }, 5000);
            }
        } else if (targetElement.id === "forgot-form-code") {
            const formData = new FormData(targetElement);
            const req = await fetch(`${apiURL}/api/login/forgot/code`, {
                method: 'POST',
                mode: 'cors',
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify({
                    username: sessionStorage.getItem('resetUsername'),
                    code: formData.get('code')
                })
            })
            const response = await req.json();
            if (response.success === true) {
                // window.location.pathname = "/team";
                sessionStorage.setItem('resetCode', formData.get('code'));
                usernameForm.style.display = 'none';
                codeForm.style.display = 'none';
                passwordForm.style.display = 'flex';
            } else {
                setShowError(true);
                setErrorMessage(response.error);
                setTimeout(() => {
                    setShowError(false);
                    setErrorMessage("");
                }, 5000);
            }
        } else if (targetElement.id === "forgot-form-password") {
            const formData = new FormData(targetElement);
            const req = await fetch(`${apiURL}/api/login/forgot/password`, {
                method: 'POST',
                mode: 'cors',
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify({
                    password: formData.get('password'),
                    username: sessionStorage.getItem('resetUsername'),
                    code: sessionStorage.getItem('resetCode')
                })
            })
            const response = await req.json();
            if (response.success === true) {
                sessionStorage.clear();
                window.location.pathname = "/signin";
            } else {
                setShowError(true);
                setErrorMessage(response.error);
                setTimeout(() => {
                    setShowError(false);
                    setErrorMessage("");
                }, 5000);
            }
        }
    }

    return (
        <div className='body'>
            <div className='forgot'>
                <form className='forgot-form' id='forgot-form-username' onSubmit={handleSubmit}>
                    <h2 className='forgot-header'>Forgot password</h2>
                    <LabeledInput labelText={"Username"} inputName={"username"} inputType={"text"} required={true} />
                    <button className='forgot-form-button' type='submit'>Submit</button>
                </form>
                <form className='forgot-form' id='forgot-form-code' onSubmit={handleSubmit}>
                    <h2 className='forgot-header'>Forgot password</h2>
                    <LabeledInput labelText={"Code"} inputName={"code"} inputType={"text"} required={true} />
                    <button className='forgot-form-button' type='submit'>Submit</button>
                </form>
                <form className='forgot-form' id='forgot-form-password' onSubmit={handleSubmit}>
                    <h2 className='forgot-header'>Forgot password</h2>
                    <LabeledInput labelText={"New Password"} inputName={"password"} inputType={"password"} enableForgot={false} required={true} />
                    <button className='forgot-form-button' type='submit'>Submit</button>
                </form>
            </div>
            <ErrorMessage showing={showError} message={errorMessage} />
        </div>
    )
};
export default ForgotPassword;