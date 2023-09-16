import { Form, Link, useActionData, useSearchParams, redirect, json, useNavigation } from "react-router-dom";
import classes from "./AuthPage.module.css"

const AuthPage = () => {
    const [searchParams] = useSearchParams();
    const isSignUp = searchParams.get("mode") === "signup";
    const navigation = useNavigation();
    const submitting = navigation.state === "submitting"
    const actionData = useActionData();


    let buttonName;
    if (isSignUp) {
        buttonName = "Sign Up"
    } else {
        buttonName = "Log in"
    }

    return <>
        <Form method="post" className={classes.form}>
            {!isSignUp ? <p>Please give in your credentials</p> : <p>Create a new user</p>}
            {actionData && actionData.errors && <ul className={classes.errors}>{Object.values(actionData.errors).map(err =>
                <li key={err}>{err}</li>
            )}</ul>}
            {actionData && <li style={{ "color": "rgb(203, 16, 16)", "listStyle": "none" }}>{actionData.message}</li>}
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" placeholder="Email-address" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Password" />
            </div>
            <section className={classes.actions}>
                <Link className={classes.link} to={`?mode=${isSignUp ? "login" : "signup"}`}>{isSignUp ? "Log in" : "Sign Up"}</Link>
                <button disabled={submitting}>{submitting ? "Submitting" : `${buttonName}`}</button>
            </section>
        </Form>
    </>
};

export default AuthPage;

export const action = async ({ request, params }) => {
    const search = new URL(request.url).searchParams;
    const mode = search.get("mode") || "login";
    const formData = await request.formData();
    const authData = {
        email: formData.get("email"),
        password: formData.get("password")
    };

    const response = await fetch("http://localhost:8080/" + mode, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST", // try request.method
        body: JSON.stringify(authData)
    });

    if (response.status === 422 || response.status === 421 || response.status === 401) {
        return response
    };

    if (!response.ok) {
        throw json({ message: "Something went wrong" }, { status: 500 })
    };

    const resData = await response.json();
    const token = resData.token;
    localStorage.setItem("token", token);

    return redirect("/products")
}