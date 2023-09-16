import { Outlet, NavLink, useLocation } from "react-router-dom";
import ProductsNavigation from "../components/ProductsLists/ProductsNavigation";
import classes from "./ProductsPage.module.css"
import shoesLink from "../extra-data/shoesLink.jpeg"
import pantsLink from "../extra-data/pantsLink.jpeg"
import tshirtsLink from "../extra-data/tshirtsLink.jpeg"
import { useEffect, useState } from "react";

const ProductsPage = () => {
    const [productsLink, setProductsLink] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/products" || location.pathname === "/products/") {
            setProductsLink(true);
        } else {
            setProductsLink(false)
        }
    }, [productsLink, location.pathname]);

    return <>
        <ProductsNavigation />
        <h3 className={classes.explore}>Explore our latest products</h3>
        {productsLink &&
        <div className={classes.navigation}>
            <NavLink to="shoes" className={classes.navLinks}>
                <img src={shoesLink} />
            </NavLink>
            <NavLink to="tshirts" className={classes.navLinks}>
                <img src={tshirtsLink} />
            </NavLink>
            <NavLink to="pants" className={classes.navLinks}>
                <img src={pantsLink} />
            </NavLink>
        </div>
        }
        <Outlet />
    </>
};

export default ProductsPage;

// export async function loader(id) {
//     const request = await fetch(`https://players-c7f1b-default-rtdb.firebaseio.com/products.json`);

//     if (!request.ok) {
//         throw json({ message: "Couldn't fetch the shoes" }, {
//             status: 500
//         })
//     };

//     const data = await request.json();
//     return data
// };

// export async function loader() {
//     return defer({
//         shoes: await productLoader(shoes),
//         pants: await productLoader(pants),
//         tshirts: await productLoader(tshirts)
//     });
// }