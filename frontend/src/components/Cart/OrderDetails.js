import { useContext } from "react";
import { Link } from "react-router-dom";
import cartContext from "../../store/use-context";
import classes from "./OrderDetails.module.css";
import Button from "../UI/Button";

const OrderDetails = props => {
    const { cartItems, addToCart, removeFromCart, setCheckOut } = useContext(cartContext);

    const addItemAmountHandler = (item) => {
        addToCart(item)
    };

    const removeItemAmountHandler = (id) => {
        removeFromCart(id)
    };

    function proceedToCheckOutHandler() {
        setCheckOut(true);
    }
    const orderDetails = <div>
        <div className={classes.cartHeader}>
            <p>Your products</p>
            <div className={classes.labels}>
                <h3>Item</h3>
                <h3>Price</h3>
                <h3>Quantity</h3>
            </div>
        </div>
        <ul className={classes.list}>
            {Object.values(cartItems.items).map(item => (
                <li key={item.id}>
                    <div className={classes.item}>
                        <img src={item.image} />
                        <h4>{item.name}</h4>
                    </div>
                    <h4>{item.price * item.amount}$</h4>
                    <h4>x{item.amount}</h4>
                    <div className={classes.actions}>
                        <button onClick={removeItemAmountHandler.bind(null, item.id)}>-</button>
                        <button onClick={addItemAmountHandler.bind(null, item)}>+</button>
                    </div>
                </li>
            ))}
        </ul>
        <div className={classes.actions}>
            <h3>Total Price: {cartItems.totalPrice}$</h3>
            <div>
                <Button onClick={props.hideCart}>Back to shopping</Button>
                <Button onClick={proceedToCheckOutHandler}>Proceed to checkout</Button>
            </div>

        </div>
    </div>
    return <>
        {cartItems.items.length > 0
            ? orderDetails
            : <div className={classes.actions}>
                <p>No products added yet</p>
                <Button onClick={props.hideCart}>Back to shopping</Button>
            </div>}
    </>
};

export default OrderDetails;