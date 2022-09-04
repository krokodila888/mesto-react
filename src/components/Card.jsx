import React, { useEffect, useState } from "react";

function Card(props) {

  const {card, onCardClick} = props;
  const {link, name, alt} = card;

  function handleClick(card) {
    onCardClick(card);
  }

  return (
    <div className="template-element">
      <div className="element">
        <button className="element__remove-button" aria-label="Удалить" type="button"></button>
        <img className="element__photo" src={`${card.link}`} alt={card.name} onClick={() => handleClick(card)}/>
        <div className="element__caption-block">
          <h3 className="element__text">{card.name}</h3>
          <div className="element__like-block">
            <button className="element__like-button" type="button" aria-label="Лайк"></button>
            <p className="element__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;  
