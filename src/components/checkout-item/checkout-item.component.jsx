import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem}) => {

    const {addItemToCart, deleteItemFromCart, decreaseItemFromCart} = useContext(CartContext);

    const {imageUrl, name, quantity, price} = cartItem;

    const increaseQuantity = () => addItemToCart(cartItem);
    const deleteItem = () => deleteItemFromCart(cartItem);
    const decreaseQuantity = () => decreaseItemFromCart(cartItem);

    return(

        <div className="checkout-item-container">

            <div className="image-container">
                <img src={imageUrl} alt={`${name}`}/>
            </div>
        
            <span className="name">{name}</span>

            <span className="quantity">
                <div className="arrow" onClick={decreaseQuantity}>&#10094;</div>
                <span className="value">{quantity}</span> 
                <div className="arrow" onClick={increaseQuantity}>&#10095;</div>
            </span>

            <span className="price">$ {price}</span>

            <div className="remove-button" onClick={deleteItem}>&#10005;</div>
        
        </div>

    )

}

export default CheckoutItem;