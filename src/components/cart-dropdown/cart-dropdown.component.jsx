import { useContext } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import { selectCartItems } from '../../store/cart/cart.selector.js';

const CartDropdown = () => {

    const cartItems = useSelector(selectCartItems)
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return(
        <CartDropdownContainer>
        <CartItems>
          {cartItems.length ? (
            cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
          ) : (
            <EmptyMessage>Your cart is empty</EmptyMessage>
          )}
        </CartItems>
        <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
      </CartDropdownContainer>
    )

}

export default CartDropdown;