import classes from "./ProductItem.module.css";
import nikeShoesImage from "../../extra-data/nike-shoes.jpeg";
import nikeTshirtImage from "../../extra-data/nike-tshirts.jpeg";
import nikePantsImage from "../../extra-data/nike-pants.jpeg"
import { useContext, useRef } from "react";
import cartContext from "../../store/use-context";
import Button from "../UI/Button";

const ProductItem = (props) => {
    const quantityRef = useRef();
    const ctx = useContext(cartContext);
    const addToCartHandler = () => {
        const quantity = quantityRef.current.value;
        ctx.addToCart({
            id: props.id,
            name: props.name,
            price: props.price,
            image: props.image,
            amount: quantity
        })
    }
    return (
        <li key={props.id} className={classes.item}>
            <img className={classes.image} src={
                props.image === "nike-shoes" && nikeShoesImage ||
                props.image === "pantsimage" && nikePantsImage ||
                props.image === "tshirtsimage" && nikeTshirtImage
            } alt='shoes' />
            <div className={classes.content}>
                <h4>{props.name}</h4>
                <p>Price: {props.price}$</p>
            </div>
            <div className={classes.actions}>
                <div>
                    <label htmlFor="quantity">Quantity: </label>
                    <input ref={quantityRef} type="number" name="quantity" id="quantity" defaultValue="1" min="1" />
                </div>
                <Button onClick={addToCartHandler}>Add +</Button>
            </div>
        </li>
    )
};

export default ProductItem;

{/* <ul className={classes.wrapper}>
<li key={props.id} className={classes.items}>
    <img className={classes.image} src={
        props.image === "nike-shoes" && nikeShoesImage ||
        props.image === "pantsimage" && nikePantsImage ||
        props.image === "tshirtsimage" && nikeTshirtImage
    } alt='shoes' />
    <div className={classes.content}>
        <h4>{props.name}</h4>
        <p>Price: {props.price}$</p>
    </div>
    <div className={classes.actions}>
        <div>
            <label htmlFor="quantity">Quantity: </label>
            <input type="number" name="quantity" id="quantity" defaultValue="1" min="1" />
        </div>
        <button onClick={addToCartHandler}>Add +</button>
    </div>
</li>
</ul> */}