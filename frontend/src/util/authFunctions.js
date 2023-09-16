import { redirect } from "react-router-dom";

export const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return null
    }
    return token
}

export const logOut = () => {
    const token = localStorage.getItem("token");
    if (token) {
        localStorage.removeItem("token");
    }
    return redirect("/auth")
};

export const checkNoUserAuth = () => {
    const token = localStorage.getItem("token");

    if(!token) {
        return redirect("/auth")
    }

    return null; 
}

export const checkUserAuth = () => {
    const token = localStorage.getItem("token");

    if(token) {
        return redirect("/products")
    }

    return null; // important in the "else" to always return null and not just leave it blank, because it could give errors
}