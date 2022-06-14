import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import {NavigationConainter, LogoContainer, NavLink, NavLinks} from "./navigation.styles.jsx"; 

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";


import { signOutUser } from "../../utils/firebase/firebase.utils"; 
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";


const Navigation = () => {

    const { currentUser} = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return(
        <Fragment>
            <NavigationConainter>
                <LogoContainer to="/">
                    <CrwnLogo className="logo"/>
                </LogoContainer>
                <NavLinks>
                    <NavLink className="nav-link" to="/shop">
                        Shop
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>
                        ) : 
                        (<NavLink to="/auth">
                            Sign In
                        </NavLink>
                        )
                    }

                    <CartIcon/>
                </NavLinks>
                { isCartOpen && <CartDropdown/> }
            </NavigationConainter>
            <Outlet/>
        </Fragment>
          )
    }

export default Navigation;