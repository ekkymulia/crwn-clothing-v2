import { createContext, useState, useEffect, useReducer } from 'react';
import createAction from '../utils/reducer/reducer.utils'

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    deleteItemFromCart: () => {},
    decreaseItemFromCart: () => {},
    cartTotal: 0
});

//useReducer

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const CartReducer = (state, action) => {
    const {type, payload} = action;
    const {isCartOpen, cartItems, cartCount, cartTotal} = state

    switch (type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }

        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload,
            }

        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    }

    

}

export const CartProvider = ({children}) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(CartReducer, INITIAL_STATE)
    // console.log('state', isCartOpen, cartItems, cartCount, cartTotal)

    const updateCartItems = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price, 0)
       
        const payload = {
            cartItems: newCartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal
        }

        return dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload))
    }

    const addItemToCart = (product) => {
        const newCartItem = addCartItem(cartItems, product);
        updateCartItems(newCartItem)
    }

    const deleteItemFromCart = (product) => {
        const newCartItem = deleteItem(cartItems, product);
        updateCartItems(newCartItem)
    }

    const decreaseItemFromCart = (product) => {
        const newCartItem = decreaseItem(cartItems, product);
        updateCartItems(newCartItem)
    }

    const setIsCartOpen = (bool) => {
        return dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }
    
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, deleteItemFromCart, decreaseItemFromCart, cartTotal};

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )

}