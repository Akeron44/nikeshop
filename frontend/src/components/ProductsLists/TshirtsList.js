import { useCallback, useEffect, useState, Fragment, Suspense } from "react";
import { Await, defer, json, Outlet, useLoaderData } from "react-router-dom";
import ProductItem from "./ProductItem";
import classes from "./TshirtsList.module.css"

const TshirtsList = () => {
    // const [tshirtsArray, setTshirtsArray] = useState([]);
    const { tshirts } = useLoaderData();
    // const transformData = useCallback(() => {
    //     let loadedShoes = [];
    //     for (const key in tshirts) {
    //         loadedShoes.push({
    //             id: key,
    //             image: tshirts[key].image,
    //             price: tshirts[key].price
    //         })
    //     }
    //     setTshirtsArray(loadedShoes);
    // }, [tshirts]);

    // useEffect(() => {
    //     transformData()
    // }, [transformData]);

    return (
        <>
            <Outlet />
            <Suspense fallback={<p style={{ "text-align": "center" }}>Loading Tshirts...</p>}>
                <Await resolve={tshirts}>
                    {(loadedTshirts) =>
                        <ul className={classes.ul}>
                            {Object.values(loadedTshirts).map(tshirt => (
                                <ProductItem
                                    key={tshirt.id}
                                    id={tshirt.id}
                                    name={tshirt.name}
                                    price={tshirt.price}
                                    image={tshirt.image}
                                />
                            ))}
                        </ul>}
                </Await>
            </Suspense>
        </>

    )
};

export default TshirtsList;

async function TshirtsLoader() {
    const request = await fetch(`https://players-c7f1b-default-rtdb.firebaseio.com/products/tshirts.json`);

    if (!request.ok) {
        // throw json({ message: "Couldn't fetch the shoes" }, {
        //     status: 500,
        // })
        throw { message: "Could not fetch Tshirts.", status: 500 }
    } else {
        const data = await request.json();
        return data
    };
};



export function loader() {
    return defer({
        tshirts: TshirtsLoader(), // add await if you want the page to wait this data to arrive first before loading
    })
}