import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector.js';

import {CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles.jsx';

import { setIsCartOpen } from '../../store/cart/cart.action.js';

const CartIcon = () => {
    const dispatch = useDispatch();

    const isCartOpen = useSelector(selectIsCartOpen)   
    const cartCount = useSelector(selectCartCount)

    const toogleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return(
        <CartIconContainer onClick={toogleIsCartOpen}>
            <ShoppingIcon className="shopping-icon"/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )


}

export default CartIcon;