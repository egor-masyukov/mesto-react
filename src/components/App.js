import React, { useState, useEffect } from "react";
import avatar from '../images/image.jpg';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import '../index.css';

export default function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [userAvatar, setUserAvatar] = useState(avatar);
    const [userName, setUserName] = useState("Жак-Ив Кусто");
    const [userDescription, setUserUserDescription] = useState("Исследователь океана");
    const [cards, setCards] = useState([]);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    useEffect(() => {
        async function fetchData() {
            const userData = await api.getUserData()
            const cards = await api.getInitialCards()
            setUserAvatar(userData.avatar)
            setUserName(userData.name)
            setUserUserDescription(userData.about)
            setCards(cards)
        }
        fetchData().catch(err => alert(`Произошла ошибка, ${err}`))
    }, []);

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
        <>
            <Header />

            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                userAvatar={userAvatar}
                userName={userName}
                userDescription={userDescription}
                cards={cards}
            />

            <Footer />

            <PopupWithForm
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                title='Редактировать профиль'
            >

                <input id="input-name" type="text" className='popup__input popup__input_type_name' name="userName"
                    placeholder="Имя" minLength="2" maxLength="40" required />
                <span id="input-name-error" className="popup__input-error"></span>
                <input id="input-description" type="text" className='popup__input popup__input_type_description'
                    name="userText" placeholder="О себе" minLength="2" maxLength="200" required />
                <span id="input-description-error" className="popup__input-error"></span>

            </PopupWithForm>

            <PopupWithForm
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                title='Новое место'
                buttonText='Создать'>

                <input id="input-title" type="text" className='popup__input popup__input_type_name' name="cardName"
                    placeholder="Название" minLength="2" maxLength="30" required />
                <span id="input-title-error" className="popup__input-error"></span>
                <input id="input-link" type="url" className='popup__input popup__input_type_description' name="cardUrl"
                    placeholder="Ссылка на картинку" required />
                <span id="input-link-error" className="popup__input-error"></span>

            </PopupWithForm>

            <PopupWithForm
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                title='Обновить аватар'>

                <input id="input-avatar" type="url" className='popup__input popup__input_type_description' name="avatar"
                    placeholder="Ссылка на аватар" required />
                <span id="input-avatar-error" className="popup__input-error"></span>

            </PopupWithForm>

            < ImagePopup
                isOpen={isImageOpen}
                onClose={closeAllPopups}
                card={selectedCard} />
        </>
    );
}