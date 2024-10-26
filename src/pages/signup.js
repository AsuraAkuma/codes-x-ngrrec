import '../css/signIn.css';
import '../css/base.css';
import LabeledInput from '../components/labeledInput';
import { useState } from 'react';
import ErrorMessage from '../components/error';

const SignUp = () => {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const req = await fetch(`http://localhost:5503/api/signup`, {
            method: 'POST',
            mode: 'cors',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password')
            })
        })
        const response = await req.json();
        if (response.success) {
            window.location.pathname = "/signin";
        } else {
            setShowError(true);
            setErrorMessage(response.error);
        }
    }

    function goToSignIn() {
        window.location.pathname = "/signin";
    }

    return (
        <div className='body'>
            <div className='signIn'>
                <form className='signIn-form' id='signup-form' onSubmit={handleSubmit}>
                    <h2 className='signIn-header'>Sign Up</h2>
                    <LabeledInput labelText={"Username"} inputName={"username"} inputType={"text"} required={true} />
                    <LabeledInput labelText={"Email"} inputName={"email"} inputType={"text"} required={true} />
                    <LabeledInput labelText={"Password"} inputName={"password"} inputType={"password"} enableForgot={false} required={true} />
                    <button className='signIn-form-button' id='signup-form-submit' type='submit'>Sign Up</button>
                    <p className='signIn-jump' onClick={goToSignIn}>Already signed up? Sign in</p>
                </form>
            </div>
            <ErrorMessage />
        </div>
    )
}

export default SignUp;