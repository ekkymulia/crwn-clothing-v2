// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import { signInWithGooglePopup, 
    // signInWithGoogleRedirect, 
    createUserDocumentFromAuth, auth } from "../../utils/firebase/firebase.utils"

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
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

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }


    return(
        <div>
            <h1>Sign In Page</h1>

            <button onClick={logGoogleUser}>
                Sign In with Google popup
            </button>

            <br/>

            <SignUpForm/>

        </div>
    )

    // put on return for sign in redirect
    // <button onClick={signInWithGoogleRedirect}>
    // Sign In with Googlw redirect
    // </button>
}

export default SignIn;