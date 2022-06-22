import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch  } from "react-redux";

import { ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import {NavigationConainter, LogoContainer, NavLink, NavLinks} from "./navigation.styles.jsx"; 

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { signOutStart } from "../../store/user/user.action";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
    const dispatch = useDispatch()

    const signOutUser = () => {
        dispatch(signOutStart())
    }

    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen);

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