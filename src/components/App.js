import React, { useState, useEffect } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import '../index.css';

export default function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        Promise.all([api.getUserData(), api.getInitialCards()])
            .then(([userData, cardData]) => {
                setCurrentUser(userData);
                setCards(cardData);
            }).catch(err => alert(`Произошла ошибка, ${err}`))
    }, [])

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (!isLiked) {
            api.setLike(card._id).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            }).catch(err => alert(`Произошла ошибка, ${err}`))
        }

        else {
            api.deleteLike(card._id).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            }).catch(err => alert(`Произошла ошибка, ${err}`))
        }
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => { setCards((cardsArray) => cardsArray.filter((cardItem) => cardItem._id !== card._id)) })
            .catch(err => alert(`Произошла ошибка, ${err}`))
    }

    const handleUpdateUser = (userData) => {
        api.editUserData(userData.name, userData.about)
            .then((res) => { setCurrentUser(res); closeAllPopups() })
            .catch(err => alert(`Произошла ошибка, ${err}`))
    }

    const handleUpdateAvatar = (link) => {
        api.editAvatar(link)
            .then((res) => { setCurrentUser(res); closeAllPopups() })
            .catch(err => alert(`Произошла ошибка, ${err}`))
    }

    const handleAddPlaceSubmit = (cardData) => {
        api.addCard(cardData.name, cardData.link)
            .then((card) => { setCards([card, ...cards]); closeAllPopups() })
            .catch(err => alert(`Произошла ошибка, ${err}`))
    }

    const handleEditProfileClick = () => { setIsEditProfilePopupOpen(true); }

    const handleAddPlaceClick = () => { setIsAddPlacePopupOpen(true); }

    const handleEditAvatarClick = () => { setIsEditAvatarPopupOpen(true); }

    const handleCardClick = (card) => {
        setIsImageOpen(true);
        setSelectedCard({ ...selectedCard, name: card.name, link: card.link })
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImageOpen(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header />

            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                cards={cards} />

            <Footer />

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser} />

            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar} />

            < AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit} />

            < ImagePopup
                isOpen={isImageOpen}
                onClose={closeAllPopups}
                card={selectedCard} />

        </CurrentUserContext.Provider>
    );
}