// import { async } from "@firebase/util";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const signIn = () => {
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
        </div>
    )
}

export default signIn;