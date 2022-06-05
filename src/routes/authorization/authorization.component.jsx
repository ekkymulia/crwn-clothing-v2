// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './authorization.style.scss';

const Authorization = () => {
    // useEffect(() => {
    //     async function data() {
    //         const response = await getRedirectResult(auth);
            
    //         if(response != null){
                
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //         console.log(response);
    //       }
    //       data();
    // }, [])

    // const logGoogleUser = async () => {
    //     const {user} = await signInWithGooglePopup();
    //     const userDocRef = await createUserDocumentFromAuth(user);
    // }


    return(
        <div className='authorization-container'>
            <SignInForm/>
            <SignUpForm/>
        </div>
    )

    // put on return for sign in redirect
    
    // <button onClick={logGoogleUser}>
    //     Sign In with Google popup
    // </button>
    // <button onClick={signInWithGoogleRedirect}>
    // Sign In with Googlw redirect
    // </button>
}

export default Authorization;