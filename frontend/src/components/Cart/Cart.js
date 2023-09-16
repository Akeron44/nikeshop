import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import cartContext from "../../store/use-context";
import OrderDetails from "./OrderDetails";
import CheckOutDetails from "./CheckOutDetails";

const Cart = (props) => {
    const { checkOut } = useContext(cartContext);
    const { hideCart } = props;

    return (
        <Modal onConfirm={hideCart}>
            {!checkOut && <OrderDetails hideCart={hideCart} />}
            {checkOut && <CheckOutDetails hideCart={hideCart} />}
        </Modal>
    )
};

export default Cart;

