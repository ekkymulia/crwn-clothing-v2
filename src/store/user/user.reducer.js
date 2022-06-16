import USER_ACTION_TYPES from "./user.types";

//reducer
const INITIAL_STATE = {
    currentUser: null
}

export const userReducer = (state = INITIAL_STATE, action = {}) => {
    // console.log('dispatch user');
    console.log(action)
    const {type, payload} = action;

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: payload
            }
            
        default:
            return state;

    }


}

