import { Outlet, useLoaderData, Form, Link, redirect } from "react-router-dom"
import Welcome from "../components/Welcome"
import classes from "./ROOTELEMENT.module.css"
import nikelogo from "../extra-data/nike.svg"
import logOutLogo from "../extra-data/logout.svg"
import login from "../extra-data/login.svg"
import ContextProvider from "../store/ContextProvider"

const RootElement = () => {

    const token = useLoaderData();
    return (
        <ContextProvider>
            <div>
                <div className={classes.nike}>
                    <img src={nikelogo} />
                    {!token && <Link style={{ "textDecoration": "none" }} to="auth?mode=login"><div className={classes.form}><img style={{ "width": "15px" }} src={login} /><button>Sign in</button></div></Link>}
                    {token && <Form className={classes.form} action="/logout" method="post"><img style={{ "width": "15px" }} src={logOutLogo} /><button>Log Out</button></Form>}
                </div>
                <Welcome />
                <Outlet />
            </div>
        </ContextProvider>
    )
};

export default RootElement