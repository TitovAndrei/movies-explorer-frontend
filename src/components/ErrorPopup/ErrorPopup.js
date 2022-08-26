import React from "react";

export default function ErrorPopup(props) {
  return (
    <div className={`error-popup ${props.isOpen ? `error-popup_opened` : ""}`}>
      <div className="error-popup__container">
        <button
          className="error-popup__close-icon"
          type="button"
          aria-label="Кнопка закрытия формы"
          onClick={props.onClose}
        ></button>
        <p
          className={`error-popup__union-title ${
            props.titleSelector ? props.titleSelector : ""
          }`}
        >
          {props.title || ""}
        </p>
      </div>
    </div>
  );
}
