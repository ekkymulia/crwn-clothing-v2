import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, deleteItemFromCart, decreaseItemFromCart } from '../../store/cart/cart.action'

import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem}) => {
    
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const {imageUrl, name, quantity, price} = cartItem;

    const increaseQuantity = () => dispatch(addItemToCart(cartItems, cartItem));
    const deleteItem = () => dispatch(deleteItemFromCart(cartItems, cartItem));
    const decreaseQuantity = () => dispatch(decreaseItemFromCart(cartItems, cartItem));

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