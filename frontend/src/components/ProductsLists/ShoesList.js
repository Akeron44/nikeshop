import { useCallback, useEffect, useState, Fragment, Suspense } from "react";
import { Await, defer, json, Outlet, useLoaderData } from "react-router-dom";
import ProductItem from "./ProductItem";
import classes from "./ShoesList.module.css"

const ShoesList = () => {
    const [shoesArray, setShoesArray] = useState([]);
    const { shoes } = useLoaderData();
    const transformData = useCallback(() => {
        let loadedShoes = [];
        for (const key in shoes) {
            loadedShoes.push({
                id: key,
                image: shoes[key].image,
                price: shoes[key].price,
                name: shoes[key].name
            });
        };
        setShoesArray(loadedShoes);
    }, [shoes]);

    useEffect(() => {
        transformData()
    }, [transformData]);

    return (
        <>
            <Outlet />
            <Suspense fallback={<p style={{ "textAlign": "center" }}>Loading Shoes...</p>}>
                <Await resolve={shoes}>
                    {(loadedItem) =>
                        <ul className={classes.ul}>
                            {Object.values(loadedItem).map(shoe => (
                                <ProductItem
                                    key={shoe.id}
                                    id={shoe.id}
                                    name={shoe.name}
                                    price={shoe.price}
                                    image={shoe.image}
                                />
                            ))}</ul>
                    }
                </Await>
            </Suspense>
        </>

    )
};

export default ShoesList;

async function shoesLoader() {
    const request = await fetch(`https://players-c7f1b-default-rtdb.firebaseio.com/products/shoes.json`);
    if (!request.ok) {
        // throw json({ message: "Couldn't fetch the shoes" }, {status: 500}) // It is giving me error and can't find why
        throw { message: "Could not fetch shoes.", status: 500 }
    } else {
        const data = await request.json();
        return data
    };



}
export async function loader() {
    return defer({
        shoes: shoesLoader(), // add await if you want the page to wait this data to arrive first before loading
    })
};