import { bazeUrl, authorization, removeConfirmForm, removeConfirmButton, popupRemoveSelector, userAvatar, avatarSelector, inputAvatar, popupAvatarForm, popupAvatarSelector, enableValidationClasses, profileEditButton, popupProfileSelector, popupMestoSelector, profileAddButton, cardsHolder, popupMestoForm, popupProfileForm, cardSelector, popupPhotoSelector, nameSelector, statusSelector } from './constants.js';

{/*Прямо внутри api.js создайте экземпляр класса Api с нужными параметрами (включая ваш токен) и экспортируйте этот экземпляр вместо самого класса.
Используйте стейт для данных из API
В компоненте Main добавьте переменные состояния userName, userDescription и userAvatar. Используйте их в JSX.
Импортируйте модуль api и добавьте эффект, вызываемый при монтировании компонента, который будет совершать запрос в API за пользовательскими данными. После получения ответа задавайте полученные данные в соответствующие переменные состояния.
Замечание. Чтобы подставить URL аватара в контейнер используйте такой код:
style={{ backgroundImage: `url(${userAvatar})` }} 
*/}

export class Api {
  constructor({bazeUrl, authorization}) {
    this._bazeUrl = bazeUrl;
    this._authorization = authorization
  }

  _handleResult(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  
  getInitialCards() {
    return fetch(`${this._bazeUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._handleResult)
  } 

  getProfileInfo() {
    return fetch(`${this._bazeUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._handleResult)
  }

  editUserInfo(data) {
    return fetch(`${this._bazeUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
    })
    .then(this._handleResult) 
  }

  postNewCard(data) {
    return  fetch(`${this._bazeUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name, link: data.link})})
      .then(this._handleResult)
  }
 
  removeCard(cardID) {
    return fetch(`${this._bazeUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._handleResult) 
  }
  
  likeCard(cardID) {
    return  fetch(`${this._bazeUrl}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._handleResult)
  }

  dislikeCard(cardID) {
    return fetch(`${this._bazeUrl}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._handleResult)
  }

  changeAvatar(data) {
    return fetch(`${this._bazeUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({avatar: data})
    }) 
    .then(this._handleResult)
  }
}
  
export const api = new Api({ bazeUrl, authorization });

