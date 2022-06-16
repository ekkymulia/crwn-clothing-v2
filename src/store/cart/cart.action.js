import CART_ACTION_TYPES from "./cart.types";
import createAction from "../../utils/reducer/reducer.utils";

//helper function
const addCartItem = (cartItems, productToAdd) => {
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

const deleteItem = (cartItems, productToRemove) => {
    //find product
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)
    //Remove quantity
    if(existingCartItem){
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
    }

    // else, nothing
    return [...cartItems];
}

const decreaseItem = (cartItems, productToDecrease) => {
    //find product
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToDecrease.id)
    
    //Decrease quantity
    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== productToDecrease.id)
    }

    return cartItems.map((cartItem) => cartItem.id === productToDecrease.id 
        ? { ...cartItem, quantity: cartItem.quantity-1}
        : cartItem
    )

}

export const addItemToCart = (cartItems, product) => {
    const newCartItem = addCartItem(cartItems, product);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItem)
}

export const deleteItemFromCart = (cartItems, product) => {
    const newCartItem = deleteItem(cartItems, product);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItem)
}

export const decreaseItemFromCart = (cartItems, product) => {
    const newCartItem = decreaseItem(cartItems, product);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItem)
}

export const setIsCartOpen = (bool) => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
}