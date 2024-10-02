import '../css/signIn.css';
import '../css/base.css';
import LabeledInput from '../components/labeledInput';

const SignUp = () => {
    return (
        <div className='body'>
            <div className='signIn'>
                <form className='signIn-form' id='signup-form'>
                    <h2 className='signIn-header'>Sign Up</h2>
                    <LabeledInput labelText={"Username"} inputName={"username"} inputType={"text"} required={true} />
                    <LabeledInput labelText={"Email"} inputName={"email"} inputType={"text"} required={true} />
                    <LabeledInput labelText={"Password"} inputName={"password"} inputType={"password"} required={true} />
                    <button className='signIn-form-button' id='signup-form-submit' type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;