import React from "react";
import PropTypes from "prop-types";
import Button from "@/components/Button";
import "./Modal.scss";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__content">
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <Button
            className="modal__close-button"
            onClick={onClose}
            variant="text"
          >
            &times;
          </Button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;
