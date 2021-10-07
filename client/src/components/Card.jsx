import React from 'react';
import { Fragment } from 'react';

export default function Card({ name, hp, attack, defense, speed, height, weight, image, types }) {
    return (
        <Fragment>
            <div>
                <div>
                    <h4>{name.replace(/\b\w/g, l => l.toUpperCase())}</h4>
                </div>
                <div>
                    <img src={image} alt='Sorry, img not found...' width='100px' height='150px'/>
                </div>
                <div>
                    <h5>Types:</h5>
                    <h5 key={types}>{types}</h5>
                </div>
            </div>
        </Fragment>
    );
}