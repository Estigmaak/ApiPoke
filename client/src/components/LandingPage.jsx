import React from 'react';
import { Link } from 'react-router-dom';

import style from './LandingPage.module.css';

export default function LandingPage(){
    return(
        <div>
        {/* <img 
        className={style.image}
        src='https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2021/07/pokemon-unite-2414165.jpg'></img> */}
        <img 
        className={style.image}
        src='https://areajugones.sport.es/wp-content/uploads/2021/07/pokemon-unite-3-1080x609.jpeg' alt='No image'></img>
            <div className={style.container}>
                <h1>¡Welcome!</h1>
                <Link to ='/home'>
                    <button className={style.button}>¡Let's go!</button>
                </Link>
            </div>
        </div>
    )
}
