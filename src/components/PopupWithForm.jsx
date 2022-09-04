import React from 'react';

function PopupWithForm(props) {
 
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container ${props.name === 'avatar' ? 'popup__avatar' : 'popup__content'} ${props.name === 'remove' ? 'popup__remove' : ''}`}>
        <button aria-label={props.buttonText} className="popup__close-button" onClick={props.onClose} type="button"></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`popup__form-container popup__${props.name}-form-container`} noValidate id={`form-${props.name}`}>
          {props.children}
          <button className="popup__save-button" type="submit">
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;  