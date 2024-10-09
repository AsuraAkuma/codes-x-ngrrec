import '../css/signIn.css';
import '../css/base.css';
import LabeledInput from '../components/labeledInput';

const SignIn = () => {
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
        if (response.success) {
            window.location.pathname = "/team";
        }
    }

    return (
        <div className='body'>
            <div className='signIn'>
                <form className='signIn-form' id='signIn-form' onSubmit={handleSubmit}>
                    <h2 className='signIn-header'>Sign In</h2>
                    <LabeledInput labelText={"Username"} inputName={"username"} inputType={"text"} required={true} />
                    <LabeledInput labelText={"Password"} inputName={"password"} inputType={"password"} required={true} />
                    <button className='signIn-form-button' id='signIn-form-submit' type='submit'>Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default SignIn;