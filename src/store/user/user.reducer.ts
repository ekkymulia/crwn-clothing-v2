import { USER_ACTION_TYPES } from './user.types';

import { AnyAction } from 'redux';
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess } from './user.action';
import { UserData } from '../../utils/firebase/firebase.utils';

export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null
}

//reducer
const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {

    if (signInSuccess.match(action)){
        return{
            ...state,
            currentUser: action.payload
        }
    }

    if (signUpSuccess.match(action)){
        return{
            ...state,
            currentUser: null
        }
    }

    if (signUpFailed.match(action) || signOutFailed.match(action) || signInFailed.match(action)){
        return{...state, error: action.payload}
    }

    return state;

}

