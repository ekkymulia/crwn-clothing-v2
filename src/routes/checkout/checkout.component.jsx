import { useContext } from "react";
import { useSelector } from "react-redux";

import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from './checkout.styles.jsx'

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector.js";


const Checkout = () => {

    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return(
        

        <CheckoutContainer>

            <CheckoutHeader>
                <HeaderBlock >
                    <span>Product</span>
                </HeaderBlock>

                <HeaderBlock >
                    <span>Description</span>
                </HeaderBlock>

                <HeaderBlock >
                    <span>Quantity</span>
                </HeaderBlock>

                <HeaderBlock >
                    <span>Price</span>
                </HeaderBlock>

                <HeaderBlock >
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>

            { cartItems.map((item) => (
                <CheckoutItem key={item.id} cartItem={item}/>
            )) }

           <Total>TOTAL $ {cartTotal}</Total>

        </CheckoutContainer>
    )

}

export default Checkout;