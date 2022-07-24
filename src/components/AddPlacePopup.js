import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');

  function handleChangeName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangeUrl(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="photo"
      title="Новое место"
      buttonText={onLoading ? `Сохранение` : `Создать`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading}>
      <label className="form__field form__fild-first">
        <input
          name="name"
          className="form__input"
          id="photo-input"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={placeName}
          onChange={handleChangeName} />
        <span className="form__input-error photo-input-error"></span>
      </label>
      <label className="form__field">
        <input
          name="link"
          className="form__input"
          id="link-input"
          type="url"
          placeholder="Ссылка на картинку"
          required
          value={placeLink}
          onChange={handleChangeUrl} />
        <span className="form__input-error link-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
