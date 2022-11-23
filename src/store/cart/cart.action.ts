import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/categories.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

//helper function
const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem):CartItem[] => {
    //find if productToAdd exist
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    // if true, add quantity
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
            ? { ...cartItem, quantity: cartItem.quantity+1}
            : cartItem
        )
    }

    // else, add new
    return [...cartItems, { ...productToAdd, quantity: 1}];

}

const deleteItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
    //find product
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)
    //Remove quantity
    if(existingCartItem){
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
    }

    // else, nothing
    return [...cartItems];
}

const decreaseItem = (cartItems: CartItem[], productToDecrease: CartItem): CartItem[] => {
    //find product
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToDecrease.id)
    
    //Decrease quantity
    if(existingCartItem && existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== productToDecrease.id)
    }

    return cartItems.map((cartItem) => cartItem.id === productToDecrease.id 
        ? { ...cartItem, quantity: cartItem.quantity-1}
        : cartItem
    )

}

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const SetIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))

export const SetCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))


export const addItemToCart = (cartItems: CartItem[], product: CartItem) => {
    const newCartItem = addCartItem(cartItems, product);
    return SetCartItems(newCartItem)
}

export const deleteItemFromCart = (cartItems: CartItem[], product: CartItem) => {
    const newCartItem = deleteItem(cartItems, product);
    return SetCartItems(newCartItem)
}

export const decreaseItemFromCart = (cartItems: CartItem[], product: CartItem) => {
    const newCartItem = decreaseItem(cartItems, product);
    return SetCartItems(newCartItem)
}

export const setIsCartOpen = (bool: Boolean) => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
}