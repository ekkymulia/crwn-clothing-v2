import { useState, 
        // useContext 
        } from "react";

import { useDispatch } from "react-redux";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up.style.scss'

import { signUpStart } from "../../store/user/user.action";

// import { UserContext } from '../../contexts/user.context';

//object

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormField);

    // const { setCurrentUser } = useContext(UserContext);

    const {
        displayName,
        email,
        password,
        confirmPassword
    } = formFields

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormField);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        //check password
        if(!displayName || !email || !password || !confirmPassword){
            console.log("input empty")
            return;
        }

        if(password !== confirmPassword){
            console.log("password do not match");
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName))
            
            resetFormFields();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }
            console.log(error);
        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value})
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign Up with your email and password</span>

            <form onSubmit={handleSubmit}>

                <FormInput label="displayName" required type="text" onChange={handleChange} name="displayName" value={displayName} />

                <FormInput label="email" required type="email" onChange={handleChange} name="email" value={email}/>

                <FormInput label="password" required type="password"  onChange={handleChange} name="password" value={password}/>

                <FormInput label="confirmPassword" required type="password"  onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button type="submit">Submit</Button>
            </form>
        </div>
    )

    /* other option
        <FormInput label="displayName" 
        inputOption = {{ 
            required: true, 
            type: "text",
            onChange: handleChange,
            name: "displayName", 
            value: displayName
        }}   />
    */

}

export default SignUpForm;