import React from 'react';

function PopupWithForm({ name, title, children, buttonText, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`} id="popup-edit">
      <div className="popup__container">
        <button id="edit-close-button" type="button" className="popup__close-button" onClick={onClose}/>
        <form name={name} className="form" id="edit-form" noValidate onSubmit={onSubmit}>
          <h2 className="form__text">{title}</h2>
          {children}
          <button type="submit" className="form__button-save" id="edit-button-save">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
