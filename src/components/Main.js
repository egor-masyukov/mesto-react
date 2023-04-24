import React from "react";
import Card from './Card';

export default function Main(props) {
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__zone">
                    <button className="profile__avatar-button" type='button' onClick={props.onEditAvatar}>
                        <img className="profile__avatar-src" src={props.userAvatar} alt="Аватар" />
                    </button>

                    <div className="profile__info">
                        <div className="profile__edit-title">
                            <h1 className="profile__title">{props.userName}</h1>
                            <button className="profile__edit-button" type="button" name="buttonProfile" onClick={props.onEditProfile} />
                        </div>
                        <p className="profile__subtitle">{props.userDescription}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" name="buttonCards" onClick={props.onAddPlace} />
            </section>
            <section className="places">
                <ul className="places__cards">
                    {props.cards.map((card) => (
                        <Card
                            key={card._id}
                            link={card.link}
                            name={card.name}
                            likes={card.likes.length}
                            onCardClick={props.onCardClick}
                            card={card}
                        />
                    ))
                    }

                </ul>
            </section>
        </main>
    )
}