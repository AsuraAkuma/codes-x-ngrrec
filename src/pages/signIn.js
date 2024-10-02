import '../css/signIn.css';
import '../css/base.css';
import LabeledInput from '../components/labeledInput';

const SignIn = () => {
    return (
        <div className='body'>
            <div className='signIn'>
                <form className='signIn-form' id='signIn-form'>
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