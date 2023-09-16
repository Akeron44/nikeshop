import { Link, useLoaderData, useLocation, redirect } from "react-router-dom";
import classes from "./Welcome.module.css"
import cartimg from "../extra-data/cart.svg"
import { useState, useEffect, useContext } from "react";
import Cart from "./Cart/Cart";
import cartContext from "../store/use-context";
const Welcome = () => {
    const [cartIsShown, setCartIsShown] = useState(false);
    const [activeUrl, setActiveUrl] = useState(false);
    const location = useLocation();
    const { cartItems } = useContext(cartContext);
    const itemsNumber = cartItems.items.length;
    useEffect(() => {
        if (location.pathname === "/" || location.pathname === "") {
            setActiveUrl(true);
        } else {
            setActiveUrl(false)
        }
    }, [activeUrl, location.pathname]);

    function showCartHandler() {
        setCartIsShown(true);
    }

    function hideCartHandler() {
        setCartIsShown(false);
    }

    const token = useLoaderData();
    return (
        <>
            <div onClick={showCartHandler} className={classes.welcome}>
                {token && <>
                    <h4>Welcome, new user</h4>
                    <div
                        className={classes.cartDiv}>
                        <img className={classes.cart} src={cartimg} />
                        <button>Cart <span>{itemsNumber}</span></button>
                    </div>
                </>}

            </div>
            {cartIsShown &&
                <Cart hideCart={hideCartHandler} />
            }
            <div className={classes.welcome}>
                {activeUrl && token && <Link to="/products">Go to products</Link>}
                {activeUrl && !token && <Link to="/auth">Log in</Link>}
            </div>
        </>
    )
};

export default Welcome;