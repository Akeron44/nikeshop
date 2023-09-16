import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootElement from "./pages/ROOTELEMENT";
import ProductsPage, {loader as productsLoader} from "./pages/ProductsPage";
import ShoesList, {loader as shoesLoader} from "./components/ProductsLists/ShoesList";
import TshirtsList, {loader as tshirtsLoader} from "./components/ProductsLists/TshirtsList";
import PantsList, {loader as pantsLoader} from "./components/ProductsLists/PantsList";
import AuthPage, { action as authAction } from "./pages/AuthPage";
import { checkNoUserAuth, checkUserAuth, getToken, logOut as logoutAction } from "./util/authFunctions";
import ErrorPage from "./pages/ErrorPage";


const router = createBrowserRouter([
  {
    path: "/",
    element:<RootElement />,
    id: "root",
    loader: getToken,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "auth",
        element: <AuthPage />,
        action: authAction,
        loader: checkUserAuth
      },
      {
        path: "products",
        element: <ProductsPage />,
        loader: checkNoUserAuth,
        children: [
          {
            path: "shoes",
            element: <ShoesList />,
            loader: shoesLoader
          },
          {
            path: "tshirts",
            element: <TshirtsList />,
            loader: tshirtsLoader
          },
          {
            path: "pants",
            element: <PantsList />,
            loader: pantsLoader
          }
        ]
      },
      {
        path: "logout",
        action: logoutAction
      },
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
