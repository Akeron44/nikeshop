import classes from "./Button.module.css";

const Button = props => {
    return (
        <button disabled={props.disabled} onClick={props.onClick} onSubmit={props.onSubmit} type={props.type} className={classes.button}>{props.children}</button>
    )
};

export default Button;