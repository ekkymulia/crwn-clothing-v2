import { createContext, useState, useEffect } from 'react';

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

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price, 0)
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const deleteItemFromCart = (productToDelete) => {
        setCartItems(deleteItem(cartItems, productToDelete));
        // setCartTotal(addCartItem(cartItems, productToIncrease));
    }

    const decreaseItemFromCart = (productToDecrease) => {
        setCartItems(decreaseItem(cartItems, productToDecrease));
    }
    
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, deleteItemFromCart, decreaseItemFromCart, cartTotal};

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )

}