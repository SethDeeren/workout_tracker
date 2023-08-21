import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "../styles/UI/Modal.module.css";

const portalElement = document.getElementById("overlay-root");

const Backdrop : React.FC<{onClose: () => void}>  = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
}

const ModalOverlay : React.FC<{children: React.ReactNode}> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

const Modal : React.FC<{onClose: () => void, children: React.ReactNode}>  = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement!)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement!
      )}
    </Fragment>
  );
}

export default Modal;