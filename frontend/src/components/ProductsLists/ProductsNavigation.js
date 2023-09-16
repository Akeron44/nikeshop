import { NavLink } from "react-router-dom";
import classes from "./ProductsNavigation.module.css";

const ProductsNavigation = () => {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink to="shoes" className={({ isActive }) => isActive ? classes.active : undefined} end>Shoes</NavLink>
                    </li>
                    <li>
                        <NavLink to="tshirts" className={({ isActive }) => isActive ? classes.active : undefined} end>T-Shirts</NavLink>
                    </li>
                    <li>
                        <NavLink to="pants" className={({ isActive }) => isActive ? classes.active : undefined} end>Pants</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
};

export default ProductsNavigation;