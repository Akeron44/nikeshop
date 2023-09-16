import { useReducer, useState } from "react";
import cartContext from "./use-context";

const defaultCartState = {
    items: [],
    totalPrice: 0
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        let updatedTotalPrice =
            state.totalPrice + action.product.price * action.product.amount;

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.product.id
        );
        const exisitingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (exisitingCartItem) {
            const updatedItem = {
                ...exisitingCartItem,
                // amount: exisitingCartItem.amount + action.product.amount,
                amount: +exisitingCartItem.amount + 1
            };
            updatedTotalPrice = state.totalPrice + exisitingCartItem.price
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.product); // concat generates a brand new object
        }

        return {
            items: updatedItems,
            totalPrice: updatedTotalPrice,
        };
    }

    if (action.type === "REMOVE") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
       
        const exisitingCartItem = state.items[existingCartItemIndex];
        const updatedTotalPrice = state.totalPrice - exisitingCartItem.price
        let updatedItems; 
        if (+exisitingCartItem.amount === 1) { // + in order to convert it from string to number
            console.log("2",exisitingCartItem)
            // when I add only 1, then it goes to 0 and - 
            // when
            updatedItems = state.items.filter(item => item.id !== action.id)
        } else {
            console.log("3",exisitingCartItem)
            let updatedItem = {
                ...exisitingCartItem,
                amount: exisitingCartItem.amount - 1
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem
        }
        return {
            items: updatedItems,
            totalPrice: updatedTotalPrice
        }
    }

    if (action.type === "CLEAR_CART") {
        return defaultCartState
    }

    return defaultCartState
}

const ContextProvider = (props) => {
    const [cart, dispatchCart] = useReducer(cartReducer, defaultCartState);
    const [checkOut, setCheckOut] = useState(false)

    const addToCart = product => {
        dispatchCart({ type: "ADD", product })
    }

    const removeFromCart = id => {
        dispatchCart({ type: "REMOVE", id })
    }

    function clearCart() {
        dispatchCart({ type: "CLEAR_CART" });
        setCheckOut(false);
    }

    const cartCxt = {
        cartItems: cart,
        addToCart,
        removeFromCart,
        checkOut,
        setCheckOut,
        clearCart
    }
    return (
        <cartContext.Provider value={cartCxt}>
            {props.children}
        </cartContext.Provider>
    )
}

export default ContextProvider;