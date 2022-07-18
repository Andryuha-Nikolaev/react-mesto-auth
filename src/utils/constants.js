export const buttonEdit = document.querySelector('#edit-button'); //кнопка открытия попапа редактирования
export const formProfile = document.querySelector('#edit-form'); //форма попапа редактирования профиля
export const nameInput = formProfile.querySelector('#name-input'); //инпут имени
export const aboutInput = formProfile.querySelector('#about-input'); //инпут описания

export const buttonAdd = document.querySelector('#add-button'); //кнопка открытия попапа добавления фото
export const formCard = document.querySelector('#add-form'); //форма попапа добавления фото

export const buttonAvatar = document.querySelector('#avatar-button'); //кнопка открытия попапа изменения аватара
export const formAvatar = document.querySelector('#avatar-form');

//объект с настройками валидации
export const validationSettings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};
