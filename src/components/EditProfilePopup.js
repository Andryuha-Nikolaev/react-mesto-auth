import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={onLoading ? `Сохранение` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="form__field form__fild-first">
        <input name="name" className="form__input" id="name-input" type="text" placeholder="имя" minLength="2"
          maxLength="40" required value={name || ''} onChange={handleChangeName} />
        <span className="form__input-error name-input-error"></span>
      </label>
      <label className="form__field">
        <input name="about" className="form__input" id="about-input" type="text" placeholder="о себе" minLength="2" maxLength="200" required value={description || ''} onChange={handleChangeDescription} />
        <span className="form__input-error about-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
