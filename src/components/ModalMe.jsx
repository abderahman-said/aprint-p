import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";

export default function ModalMe(props) {
  if (props.type === "addAddress") {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dir={"ltr"}
      >
        <Modal.Body>
          {props.header && <h4>{props.header}</h4>}
          <div>{props.body}</div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>{props.lang === 'ar' ? "اغلاق" : "close"}</Button>
        </Modal.Footer> */}
      </Modal>
    );
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dir={"ltr"}
    >
      <Modal.Body>
        {props.header && <h4>{props.header}</h4>}
        <div>{props.body}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>{"close"}</Button>
      </Modal.Footer>
    </Modal>
  );
}
