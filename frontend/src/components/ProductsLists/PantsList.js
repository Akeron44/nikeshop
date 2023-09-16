import { useCallback, useEffect, useState, Suspense } from "react";
import { Await, defer, Outlet, useLoaderData } from "react-router-dom";
import ProductItem from "./ProductItem";
import classes from "./PantsList.module.css"

const PantsList = () => {
    const [pantsArray, setPantsArray] = useState([]);
    const { pants } = useLoaderData();
    const transformData = useCallback(() => {
        let loadedShoes = [];
        for (const key in pants) {
            loadedShoes.push({
                id: key,
                image: pants[key].image,
                price: pants[key].price,
                name: pants[key].name
            });
        };
        setPantsArray(loadedShoes);
    }, [pants]);

    useEffect(() => {
        transformData()
    }, [transformData]);

    return (
        <>
            <Outlet />
            <Suspense fallback={<p style={{ "textAlign": "center" }}>Loading Pants...</p>}>
                <Await resolve={pants}>
                    {(loadedItem) =>
                        <ul className={classes.ul}>
                            {Object.values(loadedItem).map(pant => (
                                <ProductItem
                                    key={pant.id}
                                    id={pant.id}
                                    name={pant.name}
                                    price={pant.price}
                                    image={pant.image}
                                />
                            ))}</ul>
                    }
                </Await>
            </Suspense>
        </>

    )
};

export default PantsList;

async function pantsLoader() {
    const request = await fetch(`https://players-c7f1b-default-rtdb.firebaseio.com/products/pants.json`);

    if (!request.ok) {
        // throw json(
        //     { message: 'Could not fetch the pants.' },
        //     {
        //         status: 500,
        //     }
        // );
        throw { message: "Could not fetch pants.", status: 500 }
    } else {
        const data = await request.json();
        return data
    };


}
export async function loader() {
    return defer({
        pants: pantsLoader(), // add await if you want the page to wait this data to arrive first before loading
    })
};


// import { useCallback, useEffect, useState, Suspense } from "react";
// import { Await, defer, json, useLoaderData } from "react-router-dom";
// import ProductItem from "./ProductItem";
// import classes from "./PantsList.module.css"

// const PantsList = () => {
//     const [pantsArray, setPantsArray] = useState([]);
//     const {pants} = useLoaderData();
//     const transformData = useCallback(() => {
//         let loadedShoes = [];
//         for (const key in pants) {
//             loadedShoes.push({
//                 id: key,
//                 image: pants[key].image,
//                 price: pants[key].price,
//                 name: pants[key].name
//             });
//         };
//         setPantsArray(loadedShoes);
//     }, [pants]);

//     useEffect(() => {
//         transformData()
//     }, [transformData])


//     return (
//         <Suspense fallback={<p style={{"textAlign": "center"}}>Loading...</p>}>
//             <Await resolve={pants}>
//                 {(loadedPants) =>
//                     <ul className={classes.ul}>
//                         {Object.values(loadedPants).map(pant => (
//                             <ProductItem
//                                 id={pant.id}
//                                 name={pant.name}
//                                 price={pant.price}
//                                 image={pant.image}
//                             />
//                         ))}
//                     </ul>}
//             </Await>
//         </Suspense>
//     )
// };

// export default PantsList;

// async function pantsLoader() {
//     const request = await fetch(`https://players-c7f1b-default-rtdb.firebaseio.com/products/pants.json`);

//     if (!request.ok) {
//         throw json({ message: "Couldn't fetch the shoes" }, {
//             status: 500
//         })
//     };

//     const data = await request.json();
//     return data
// };

// export async function loader() {
//     defer({
//         pants: pantsLoader(),
//     })
// };

