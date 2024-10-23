import '../css/signIn.css';
import '../css/base.css';
import LabeledInput from '../components/labeledInput';
import { useState } from 'react';
import ErrorMessage from '../components/error';

const SignIn = () => {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const req = await fetch(`http://localhost:5500/api/login`, {
            method: 'POST',
            mode: 'cors',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
                username: formData.get('username'),
                password: formData.get('password')
            })
        })
        const response = await req.json();
        console.log(response)
        if (response.success) {
            sessionStorage.setItem('sessionKey', response.sessionKey);
            window.location.pathname = "/team";
        } else {
            setShowError(true);
            setErrorMessage(response.error);
            setTimeout(() => {
                setShowError(false);
                setErrorMessage("");
            }, 5000);
        }
    }
    function goToSignUp() {
        window.location.pathname = "/signup";
    }
    return (
        <div className='body'>
            <div className='signIn'>
                <form className='signIn-form' id='signIn-form' onSubmit={handleSubmit}>
                    <h2 className='signIn-header'>Sign In</h2>
                    <LabeledInput labelText={"Username"} inputName={"username"} inputType={"text"} required={true} />
                    <LabeledInput labelText={"Password"} inputName={"password"} inputType={"password"} enableForgot={true} required={true} />
                    <button className='signIn-form-button' id='signIn-form-submit' type='submit'>Sign In</button>
                    <p className='signIn-jump' onClick={goToSignUp}>Not signed up? Sign up</p>
                </form>
            </div>
            <ErrorMessage showing={showError} message={errorMessage} />
        </div>
    )
}

export default SignIn;