import classes from "./Input.module.css";

function Input(props) {
    return (
        <div className={classes.details}>
            <label style={{ color: `${props.inputHasError ? "rgb(194, 34, 34)" : "black"}` }} htmlFor={props.name}>{props.label}</label>
            <input style={{ border: `${props.inputHasError ? "2px solid rgb(194, 34, 34)" : "1px solid #111"}` }} value={props.value} onChange={props.onChange} onBlur={props.onBlur} name={props.name} id={props.id} type={props.type} placeholder={props.placeholder}required />
        </div>
    )
};

export default Input;