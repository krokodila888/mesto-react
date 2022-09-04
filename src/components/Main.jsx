import React, { useEffect, useState } from "react";
import ImagePopup from './ImagePopup';
import Card from './Card';
import { api } from './../utils/Api';

function Main(props) {

  const {onEditProfile, onEditAvatar, onAddPlace, onCardClick} = props;
 
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getProfileInfo()
      .then((user) => {
        setUserName(user.name)
        setUserStatus(user.about)
        setUserAvatar(user.avatar)
      })
      .catch(err => console.log(err))}, [])
      
  useEffect(() => {
    api.getInitialCards()
      .then((card) => {
        setCards([...cards, ...card])
  })
        .catch(err => console.log(err))
      }, [])
     
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-hover">
          <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} src="<%=require('./images/kusto.svg')%>" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__username">{userName}</h1>
            <button aria-label="Редактировать" className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__status">{userStatus}</p>
        </div>
        <button aria-label="Добавить" className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((item) =>
        <div key={item._id}>
          <Card 
            card = {item}
            onCardClick = {onCardClick}
          />
        </div>)}
          
      </section>
    </main>
  );
}  

export default Main; 