import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up.style.scss'

//object

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormField);

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
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            // if(userDocRef != null){
                // const {user} = userDocRef;
                // user.displayName = displayName; (this is also works, but i changed it so its like the vids tutorial)
                const response = await createUserDocumentFromAuth(user, {displayName});
                // console.log(response);
            // }

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