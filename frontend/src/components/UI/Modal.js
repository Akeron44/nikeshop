import React, { Fragment } from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = props => {
  return <div onClick={props.onConfirm}  className={classes.backdrop}></div>;
};

const Overlay = props => {
  return (
    <div className={classes.modal}>
      {props.children}
    </div>
  )
};

const Modal = props => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      ;
      {ReactDom.createPortal(
        <Overlay>{props.children}</Overlay>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Modal;