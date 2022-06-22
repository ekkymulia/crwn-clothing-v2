import { useState, 
        // useContext
        } from 'react';

import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import './sign-in.style.scss';

import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';

// import { UserContext } from "../../contexts/user.context";

const defaultSignInFormField = {
    email : '',
    password : ''
}



const SignInForm = () => {

    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultSignInFormField);

    // const { setCurrentUser } = useContext(UserContext);

    const {
        email,
        password,
    } = formFields

    const resetFormFields = () => {
        setFormFields(defaultSignInFormField);
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart())        
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!email || !password){
            alert("input empty")
            return;
        }

        try {
            dispatch(emailSignInStart(email, password))
            resetFormFields();
        } catch (error) {

            switch (error.code){
                case 'auth/user-not-found':
                    alert('Cannot sign in, user not found');
                    break;
                case 'auth/wrong-password':
                    alert('Cannot sign in, wrong password');
                    break;
                default:
                    console.log(error);
            }

            // if(error.code === 'auth/wrong-password'){
            //     alert('Cannot sign in, wrong password');
            // }
            
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value})
    }

    return(

        <div className='sign-up-container'>

        <h2>Already have an account?</h2>
        <span>Sign In with your email and password</span>
            
            <form onSubmit={handleSubmit}>
                <FormInput label="email" required type="email" onChange={handleChange} name="email" value={email}/>

                <FormInput label="password" required type="password"  onChange={handleChange} name="password" value={password}/>

                <div className='buttons-container'>
                    <Button type="submit">Submit</Button>
                    <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Sign in with Google</Button>
                </div>
                
            </form>

        </div>
    )

}

export default SignInForm;