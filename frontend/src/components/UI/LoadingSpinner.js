import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => <div style={{height: props.height, width: props.width}} className={classes.loader}></div>;

export default LoadingSpinner;