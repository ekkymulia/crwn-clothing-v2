import { AnyAction } from "redux";

import { SetCartItems, SetIsCartOpen } from "./cart.action";

import { CartItem } from "./cart.types";

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
}

export const INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [], 
}

export const CartReducer = (state = INITIAL_STATE, action: AnyAction):CartState => {
    
    if(SetIsCartOpen.match(action)){
        return{
            ...state,
            isCartOpen: action.payload as boolean,
        }
    }

    if(SetCartItems.match(action)){
        return{
            ...state,
            cartItems: action.payload as CartItem[],
        }
    }

    return state

}