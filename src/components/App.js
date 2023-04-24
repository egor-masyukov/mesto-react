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
        fetchData()
    }, []);

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false),
        [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false),
        [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)

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

    document.body.className = "page";
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
            />
            <PopupWithForm
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
            />
            <PopupWithForm
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
            />
            < ImagePopup
                isOpen={isImageOpen}
                onClose={closeAllPopups}
                card={selectedCard} />
        </>
    );
}