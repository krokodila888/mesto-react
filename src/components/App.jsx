import React, { useEffect, useState } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import '../index.css';
import { api } from './../utils/Api';
import { CurrentUserContext, currentUser } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);  
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  
  const [currentUser, setCurrentUser] = useState({
    avatar: '',
    name: '',
    about: '',
  });
  
  useEffect(() => {
    api
      .getProfileInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err))
    }, [])

  function openEditProfile() {
    {return setIsEditProfilePopupOpen(true)}
  }

  function openPopupAvatar() {
    {return setIsEditAvatarPopupOpen(true)}
  }
    
  function openPopupMesto() {
    {return setIsAddPlacePopupOpen(true)}
  }

  function handleCardClick(data) {
    return setIsImagePopupOpen(true), 
    setSelectedCard(data);
  }
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((data1) => {
        setCurrentUser(data1);
        closeAllPopups()
    })
  }

  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then((data1) => {
        setCurrentUser(data1);
        closeAllPopups()
      })
      .catch((err) => console.log(err));
    
  }

  useEffect(() => {
    api.getInitialCards()
      .then((card) => {
        setCards([...cards, ...card])
    })
      .catch(err => console.log(err))
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
      })
      .catch((err) => console.log(err))
  } 

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    if (isOwn) return api.removeCard(card._id)
      .then(() => {
        const newCard = cards.filter((item) => item._id !== card._id);
        setCards(newCard);
      })
      .catch((err) => console.log(err))
  } 

  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err) => console.log(err))
  }
    
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main 
        onEditProfile = {openEditProfile} 
        onEditAvatar = {openPopupAvatar} 
        onAddPlace = {openPopupMesto} 
        onClose = {closeAllPopups}
        onCardClick = {handleCardClick} 
        cards = {cards}
        onCardLike = {handleCardLike}
        onCardDelete = {handleCardDelete} />

      <Footer />
      
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateCards={handleAddPlaceSubmit}/>

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 

      <PopupWithForm 
        onClose = {closeAllPopups}
        popupSelector = {'popup_remove'} 
        name = {`remove`} 
        title = {'Вы уверены?'} 
        buttonText = {'Да'}
      />
      <ImagePopup 
        onClose = {closeAllPopups}
        card = {selectedCard}
        isImagePopupOpen={isImagePopupOpen}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;