import React from 'react';
import { Fragment } from 'react';

import style from './Card.module.css';

export default function Card({ name, hp, attack, defense, speed, height, weight, image, types }) {
    return (
        <Fragment>
            <div className={style.card}>
                <h4 text-decoration='none'>{name.replace(/\b\w/g, l => l.toUpperCase())}</h4>
                <img src={image} alt='Sorry, img not found...' width='100px' height='120px'/>
                    <h5 text-decoration='none'>Types:</h5>
                    <span key={types} text-decoration='none'>{types}</span>
            </div>
        </Fragment>
    );
}