import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const avatarRef = React.useRef('');

  function handleChangeAvatar() {
    return avatarRef.current.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  useEffect(() => {
    avatarRef.current.value='';
  }, [isOpen]);

  return (
    <PopupWithForm
    name="ava"
    title="Обновить аватар"
    buttonText={onLoading ? `Сохранение` : `Сохранить`}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}>
    <label className="form__field form__fild-first">
      <input name="avatar" className="form__input" id="avatar-input" type="url" placeholder="Ссылка на аватар" required ref={avatarRef} onChange={handleChangeAvatar}/>
      <span className="form__input-error avatar-input-error"></span>
    </label>
  </PopupWithForm>
  )
}

export default EditAvatarPopup;
