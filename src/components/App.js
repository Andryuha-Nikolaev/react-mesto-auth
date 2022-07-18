import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api.getUserInfo().then((profileInfo) => {
      setCurrentUser(profileInfo)
    })
      .catch((err) => {
        console.log(err);
      })

    api.getCards().then((cardsData) => {
      setCards(cardsData.map((card) => ({
        _id: card._id,
        name: card.name,
        link: card.link,
        likes: card.likes,
        owner: card.owner
      })))
    })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({});
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api.setUserInfo(newUserInfo).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api.setUserAvatar(newAvatar).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
        setCards((state) => state.filter(item => item._id != (card._id)))
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.postCard(data).then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header />
          <Main
            onEditProfile={setIsEditProfilePopupOpen}
            onAddPlace={setIsAddPlacePopupOpen}
            onEditAvatar={setIsEditAvatarPopupOpen}
            onCardClick={setSelectedCard}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading} />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoading} />

          <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            buttonText="Да">
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
