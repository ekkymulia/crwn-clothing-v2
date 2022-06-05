import { useState, 
        // useContext
        } from 'react';

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in.style.scss';

// import { UserContext } from "../../contexts/user.context";

const defaultSignInFormField = {
    email : '',
    password : ''
}



const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultSignInFormField);

    // const { setCurrentUser } = useContext(UserContext);

    const {
        email,
        password,
    } = formFields

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultSignInFormField);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        // const userDocRef = await createUserDocumentFromAuth(user);
        console.log(user);
        
        // setCurrentUser(user);
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!email || !password){
            alert("input empty")
            return;
        }

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(user);
            
            // setCurrentUser(user);
            // if(userDocRef != null){
                // const {user} = userDocRef;
                // user.displayName = displayName; (this is also works, but i changed it so its like the vids tutorial)
                // const response = await createUserDocumentFromAuth(user, {displayName});
                // console.log(response);
            // }

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
                    <Button type="button" onClick={signInWithGoogle} buttonType="google">Sign in with Google</Button>
                </div>
                
            </form>

        </div>
    )

}

export default SignInForm;