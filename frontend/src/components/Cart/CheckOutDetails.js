import { Fragment, useContext, useEffect, useState } from "react";
import cartContext from "../../store/use-context";
import UseInput from "../../hooks/UseInput";
import Button from "../UI/Button"
import classes from "./CheckOutDetails.module.css";
import Input from "../UI/Input";
import { useNavigate } from "react-router-dom";

const CheckOutDetails = (props) => {
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [formIsValid, setFormIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const { setCheckOut, cartItems, clearCart } = useContext(cartContext)

    function editOrderHandler() {
        setCheckOut(false)
    }

    function paymentMethodHandler(event) {
        setPaymentMethod(event.target.value);
    }
    
    const {
        value: nameValue,
        onChange: nameOnChangeHandler,
        onBlur: nameOnBlurHandler,
        inputIsValid: nameInputIsValid,
        inputHasError: nameInputHasError
    } = UseInput(value => value.trim().length > 3);

    const {
        value: addressValue,
        onChange: addressOnChangeHandler,
        onBlur: addressOnBlurHandler,
        inputIsValid: addressInputIsValid,
        inputHasError: addressInputHasError
    } = UseInput(value => value.includes("Street"));

    const {
        value: cartHolderValue,
        onChange: cartHolderOnChangeHandler,
        onBlur: cartHolderOnBlurHandler,
        inputIsValid: cartHolderInputIsValid,
        inputHasError: cartHolderInputHasError
    } = UseInput(value => value.trim().length > 5);

    const {
        value: cartNumberValue,
        onChange: cartNumberOnChangeHandler,
        onBlur: cartNumberOnBlurHandler,
        inputIsValid: cartNumberInputIsValid,
        inputHasError: cartNumberInputHasError
    } = UseInput(value => value.trim().length === 12);

    const {
        value: cartExpiryDateValue,
        onChange: cartExpiryDateOnChangeHandler,
        onBlur: cartExpiryDateOnBlurHandler,
        inputIsValid: cartExpiryDateInputIsValid,
        inputHasError: cartExpiryDateInputHasError
    } = UseInput(value => value.includes("/") && value.trim().length === 5);

    const {
        value: cartCodeValue,
        onChange: cartCodeOnChangeHandler,
        onBlur: cartCodeOnBlurHandler,
        inputIsValid: cartCodeInputIsValid,
        inputHasError: cartCodeInputHasError
    } = UseInput(value => value.trim().length === 3);

    useEffect(() => {
        if (paymentMethod === "cash") {
            setFormIsValid(nameInputIsValid && addressInputIsValid)
        }

        if (paymentMethod === "cart") {
            setFormIsValid(nameInputIsValid && addressInputIsValid && cartHolderInputIsValid && cartExpiryDateInputIsValid && cartNumberInputIsValid && cartCodeInputIsValid)
        }
    }, [paymentMethod, nameInputIsValid, addressInputIsValid, cartHolderInputIsValid, cartExpiryDateInputIsValid, cartNumberInputIsValid, cartCodeInputIsValid]);


    async function sendOrderToDataBase() {
        setIsLoading(true);
        setIsSubmitted(false);
        const response = await fetch("https://players-c7f1b-default-rtdb.firebaseio.com/products/order.json", {
            method: "POST",
            body: JSON.stringify(
                {
                    order: cartItems.items,
                    name: nameValue, address: addressValue, paymentMethod: paymentMethod,
                    cartHolder: cartHolderValue ? cartHolderValue : null,
                    cartNumber: cartNumberValue ? cartNumberValue : null,
                    cartExpiryDate: cartExpiryDateValue ? cartExpiryDateValue : null,
                    cartCode: cartCodeValue ? cartCodeValue : null,
                }
            ),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw { message: "Order could not be sent" }
        }
        setIsLoading(false);
        setIsSubmitted(true);

        return response;
    };

    function sendOrderHandler(event) {
        event.preventDefault();
        if (!formIsValid) {
            return
        };
        sendOrderToDataBase();
    }

    useEffect(() => {
        if (isSubmitted === true) {
            setTimeout(() => {
                props.hideCart();
                clearCart();
                navigate("/products");
            }, 1500)
        }
    }, [isSubmitted])
    return (
        <>
            {!isLoading && !isSubmitted && <form onSubmit={sendOrderHandler} style={{ height: `${paymentMethod === "cash" ? "200px" : "450px"}` }} className={classes.div}>
                <Input
                    inputHasError={nameInputHasError}
                    name="name"
                    label="Full Name: "
                    value={nameValue}
                    id="name"
                    type="text"
                    placeholder="Joe Doe..."
                    onChange={nameOnChangeHandler}
                    onBlur={nameOnBlurHandler}
                />
                {nameInputHasError && <p className={classes.error}>*Invalid name. Name needs to be at least 3 characters long</p>}

                <Input
                    inputHasError={addressInputHasError}
                    name="address"
                    label="Address: "
                    value={addressValue}
                    id="address"
                    type="text"
                    placeholder="Street"
                    onChange={addressOnChangeHandler}
                    onBlur={addressOnBlurHandler}
                />
                {addressInputHasError && <p className={classes.error}>*Invalid address. It doesn't have a street</p>}

                <div className={classes.details}>
                    <label htmlFor="payment">Payment: </label>
                    <select className={classes.option} value={paymentMethod} name="payment-method" onChange={paymentMethodHandler} defaultValue="cash">
                        <option value="cash">Cash</option>
                        <option value="cart">Cart</option>
                    </select>
                </div>

                {paymentMethod === "cart" &&
                    <Fragment>
                        <Input
                            inputHasError={cartHolderInputHasError}
                            name="cart-holder"
                            label="Cart Holder "
                            value={cartHolderValue}
                            id="cart-holder"
                            type="text"
                            placeholder="Cart Holder"
                            onChange={cartHolderOnChangeHandler}
                            onBlur={cartHolderOnBlurHandler}
                        />
                        {cartHolderInputHasError && <p className={classes.error}>*Invalid name. Name needs to be at least 5 characters long</p>}

                        <Input
                            inputHasError={cartNumberInputHasError}
                            name="cart-number"
                            label="Cart Number"
                            value={cartNumberValue}
                            id="cart-number"
                            type="text"
                            placeholder="Cart Number"
                            onChange={cartNumberOnChangeHandler}
                            onBlur={cartNumberOnBlurHandler}
                        />
                        {cartNumberInputHasError && <p className={classes.error}>*Invalid input. Cart needs to have 12 numbers</p>}

                        <Input
                            inputHasError={cartExpiryDateInputHasError}
                            name="cart-expiry"
                            label="Cart Expiry "
                            value={cartExpiryDateValue}
                            id="cart-expiry"
                            type="text"
                            placeholder="03/23"
                            onChange={cartExpiryDateOnChangeHandler}
                            onBlur={cartExpiryDateOnBlurHandler}
                        />
                        {cartExpiryDateInputHasError && <p className={classes.error}>*Invalid date. It doesn't contain "/" or it has not a valid date</p>}

                        <Input
                            inputHasError={cartCodeInputHasError}
                            name="cart-code"
                            label="Cart Code "
                            value={cartCodeValue}
                            id="cart-code"
                            type="password"
                            placeholder="***"
                            onChange={cartCodeOnChangeHandler}
                            onBlur={cartCodeOnBlurHandler}
                        />
                        {cartCodeInputHasError && <p className={classes.error}>*Invalid code. Code needs to be 3 characters long</p>}
                    </Fragment>}

                <div className={classes.action}>
                    <Button onClick={editOrderHandler}>Go Back</Button>
                    <Button disabled={!formIsValid} type="submit">Finish order</Button>
                </div>
            </form>}
            {isLoading && !isSubmitted && <p className={classes.state}>Sending Order</p>}
            {!isLoading && isSubmitted && <p className={classes.state}>Order Sent!</p>}
        </>

    )
};

export default CheckOutDetails;

//import { Fragment, useContext, useEffect, useState } from "react";
// import { useNavigation } from "react-router-dom";
// import { Form } from "react-router-dom";
// import cartContext from "../../store/use-context";
// import UseInput from "../../hooks/UseInput";
// import Button from "../../UI/Button"
// import classes from "./CheckOutDetails.module.css"

// const CheckOutDetails = () => {
//     const [paymentMethod, setPaymentMethod] = useState("cash");
//     const [formIsValid, setFormIsValid] = useState(false);
//     const {
//         value: nameValue,
//         onChange: nameOnChangeHandler,
//         onBlur: nameOnBlurHandler,
//         inputIsValid: nameInputIsValid,
//         inputHasError: nameInputHasError,
//         reset: resetName
//     } = UseInput(value => value.trim().length > 3);

//     const {
//         value: addressValue,
//         onChange: addressOnChangeHandler,
//         onBlur: addressOnBlurHandler,
//         inputIsValid: addressInputIsValid,
//         inputHasError: addressInputHasError,
//         reset: resetAddress
//     } = UseInput(value => value.includes("Street"));

//     const {
//         value: cartHolderValue,
//         onChange: cartHolderOnChangeHandler,
//         onBlur: cartHolderOnBlurHandler,
//         inputIsValid: cartHolderInputIsValid,
//         inputHasError: cartHolderInputHasError,
//         reset: resetCartHolder
//     } = UseInput(value => value.trim().length > 5);

//     const {
//         value: cartNumberValue,
//         onChange: cartNumberOnChangeHandler,
//         onBlur: cartNumberOnBlurHandler,
//         inputIsValid: cartNumberInputIsValid,
//         inputHasError: cartNumberInputHasError,
//         reset: resetCartNumber
//     } = UseInput(value => value.trim().length === 12);

//     const {
//         value: cartExpiryDateValue,
//         onChange: cartExpiryDateOnChangeHandler,
//         onBlur: cartExpiryDateOnBlurHandler,
//         inputIsValid: cartExpiryDateInputIsValid,
//         inputHasError: cartExpiryDateInputHasError,
//         reset: resetCartExpiryDate
//     } = UseInput(value => value.includes("/") && value.trim().length === 5);

//     const {
//         value: cartCodeValue,
//         onChange: cartCodeOnChangeHandler,
//         onBlur: cartCodeOnBlurHandler,
//         inputIsValid: cartCodeInputIsValid,
//         inputHasError: cartCodeInputHasError,
//         reset: resetCartCode
//     } = UseInput(value => value.trim().length === 3);

//     useEffect(() => {
//         if (paymentMethod === "cash") {
//             setFormIsValid(nameInputIsValid && addressInputIsValid)
//         }

//         if (paymentMethod === "cart") {
//             setFormIsValid(nameInputIsValid && addressInputIsValid && cartHolderInputIsValid && cartExpiryDateInputIsValid && cartNumberInputIsValid && cartCodeInputIsValid)
//         }
//     }, [paymentMethod, nameInputIsValid, addressInputIsValid, cartHolderInputIsValid, cartExpiryDateInputIsValid, cartNumberInputIsValid, cartCodeInputIsValid])


//     const { setCheckOut, cartItems } = useContext(cartContext)
//     function paymentMethodHandler(event) {
//         setPaymentMethod(event.target.value);
//     }

//     function editOrderHandler() {
//         setCheckOut(false)
//     }

//     const navigation = useNavigation();
//     const isSubmitting = navigation.state === "submitting";


//     return (
//         <Form itemID="a1" method="post" style={{ height: `${paymentMethod === "cash" ? "200px" : "450px"}` }} className={classes.div}>
//             <div className={classes.details}>
//                 <label style={{ color: `${nameInputHasError ? "rgb(194, 34, 34)" : "black"}` }} htmlFor="name">Full name: </label>
//                 <input style={{ border: `${nameInputHasError ? "2px solid rgb(194, 34, 34)" : "1px solid #111"}` }} value={nameValue} onChange={nameOnChangeHandler} onBlur={nameOnBlurHandler} name="name" id="name" type="text" placeholder="Joe Doe..." required />
//             </div>
//             {nameInputHasError && <p className={classes.error}>*Invalid name. Name needs to be at least 3 characters long</p>}

//             <div className={classes.details}>
//                 <label style={{ color: `${addressInputHasError ? "rgb(194, 34, 34)" : "black"}` }} htmlFor="address">Address: </label>
//                 <input style={{ border: `${addressInputHasError ? "2px solid rgb(194, 34, 34)" : "1px solid #111"}` }} value={addressValue} onChange={addressOnChangeHandler} onBlur={addressOnBlurHandler} name="address" id="address" type="text" placeholder="Street name and number..." required />
//             </div>
//             {addressInputHasError && <p className={classes.error}>*Invalid address. It doesn't have a street</p>}

//             <div className={classes.details}>
//                 <label htmlFor="payment">Payment: </label>
//                 <select value={paymentMethod} name="payment-method" onChange={paymentMethodHandler} defaultValue="cash">
//                     <option value="cash">Cash</option>
//                     <option value="cart">Cart</option>
//                 </select>
//             </div>

//             {paymentMethod === "cart" &&
//                 <Fragment>
//                     <div className={classes.details}>
//                         <label style={{ color: `${cartHolderInputHasError ? "rgb(194, 34, 34)" : "black"}` }} htmlFor="name">Cart Holder: </label>
//                         <input style={{ border: `${cartHolderInputHasError ? "2px solid rgb(194, 34, 34)" : "1px solid #111"}` }} value={cartHolderValue} onChange={cartHolderOnChangeHandler} onBlur={cartHolderOnBlurHandler} name="cart-holder" id="name" type="text" placeholder="Joe Doe..." required />
//                     </div>
//                     {cartHolderInputHasError && <p className={classes.error}>*Invalid name. Name needs to be at least 5 characters long</p>}

//                     <div className={classes.details}>
//                         <label style={{ color: `${cartNumberInputHasError ? "rgb(194, 34, 34)" : "black"}` }} htmlFor="cart-number">Cart Number: </label>
//                         <input style={{ border: `${cartNumberInputHasError ? "2px solid rgb(194, 34, 34)" : "1px solid #111"}` }} value={cartNumberValue} onChange={cartNumberOnChangeHandler} onBlur={cartNumberOnBlurHandler} name="cart-number" id="cart-number" type="text" placeholder="4719 7838 8973 3778" required />
//                     </div>
//                     {cartNumberInputHasError && <p className={classes.error}>*Invalid input. Cart needs to have 12 numbers</p>}

//                     <div className={classes.details}>
//                         <label style={{ color: `${cartExpiryDateInputHasError ? "rgb(194, 34, 34)" : "black"}` }} htmlFor="cart-expiry-date">Expires: </label>
//                         <input style={{ border: `${cartExpiryDateInputHasError ? "2px solid rgb(194, 34, 34)" : "1px solid #111"}` }} value={cartExpiryDateValue} onChange={cartExpiryDateOnChangeHandler} onBlur={cartExpiryDateOnBlurHandler} name="cart-expiry-date" id="cart-expiry-date" type="text" placeholder="03/26" required />
//                     </div>
//                     {cartExpiryDateInputHasError && <p className={classes.error}>*Invalid date. It doesn't contain "/" or it has not a valid date</p>}

//                     <div className={classes.details}>
//                         <label style={{ color: `${cartCodeInputHasError ? "rgb(194, 34, 34)" : "black"}` }} htmlFor="cart-code">Code: </label>
//                         <input style={{ border: `${cartCodeInputHasError ? "2px solid rgb(194, 34, 34)" : "1px solid #111"}` }} value={cartCodeValue} onChange={cartCodeOnChangeHandler} onBlur={cartCodeOnBlurHandler} name="cart-code" id="cart-code" type="password" placeholder="***" required />
//                     </div>
//                     {cartCodeInputHasError && <p className={classes.error}>*Invalid code. Code needs to be 3 characters long</p>}
//                 </Fragment>}
//             <div className={classes.action}>
//                 <Button onClick={editOrderHandler}>Go Back</Button>
//                 <Button disabled={!formIsValid || isSubmitting}>{!isSubmitting ? "Finish order": "Submitting"}</Button>
//             </div>
//         </Form>
//     )
// };

// export default CheckOutDetails;