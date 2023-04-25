import React from "react";

export default function Card(props) {
    const handleClick = () => { props.onCardClick(props.card); }

    return (
        <li className="place">
            <img className="place__image" onClick={handleClick} src={props.link} alt={props.name} />
            <button className="place__button-delete" type="button" />
            <div className="place__title-zone">
                <h2 className="place__title">{props.name}</h2>
                <div className="place__like">
                    <button className="place__like-button" type="button" />
                    <p className="place__like-sum">{props.likes}</p>
                </div>
            </div>
        </li>
    )
}