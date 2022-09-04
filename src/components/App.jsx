import React, { useEffect, useState } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import '../index.css';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');

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
    {return setSelectedCard(data)}
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard('');   
  }

  return (
    <div className="page">
      <Header />
      <Main 
        onEditProfile = {openEditProfile} 
        onEditAvatar = {openPopupAvatar} 
        onAddPlace = {openPopupMesto} 
        onClose = {closeAllPopups}
        onCardClick = {handleCardClick} />
      <Footer />
      <PopupWithForm 
        isOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
        popupSelector = {'popup_mesto'} 
        name = {`mesto`} 
        title = {'Новое место'} 
        buttonText = {'Создать'}
        children = {
          <>
              <input className="popup__input popup__input_photo-name" required id="input-photo-name" name="name" type="text" placeholder="Название" minLength="2" maxLength="30" />
              <span className="input-photo-name-error popup__input-error"> </span>
              <input className="popup__input popup__input_photo-link" required id="input-photo-link" name="link" placeholder="Ссылка на картинку" type="url" />
              <span className="input-photo-link-error popup__input-error"> </span>
          </>
        } />

      <PopupWithForm 
        isOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
        popupSelector = {'popup_avatar'} 
        name = {`avatar`} 
        title = {'Обновить аватар'} 
        buttonText = {'Сохранить'}
        children = {
          <>
              <input className="popup__input popup__input-avatar" defaultValue=" " required id="input-avatar" name="avatar" type="url" />
              <span className="input-avatar-error popup__input-error"> </span>
          </>
        } />

      <PopupWithForm 
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
        popupSelector = {'popup_profile'} 
        name = {`profile`} 
        title = {'Редактировать профиль'} 
        buttonText = {'Сохранить'}
        children = {
          <>
            <input className="popup__input popup__input_username" required id="input-username" name = "name" type="text" defaultValue="Жак-Ив Кусто" minLength="2" maxLength="40" />
            <span className="input-username-error popup__input-error"> </span>
            <input className="popup__input popup__input_status" required id="input-status" name = "about" type="text" defaultValue="Исследователь океана" minLength="2" maxLength="200" />
            <span className="input-status-error popup__input-error"> </span>
           </>
        } />

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
        />

      
    </div>
  );
}


export default App;
