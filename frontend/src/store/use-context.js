import { createContext } from "react"

 const cartContext = createContext({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    checkOut: false,
    setCheckOut: () => {},
    clearCart: () => {}
});

export default cartContext;